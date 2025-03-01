import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from "../auth/[...nextauth]/options";
import getUserCoin from "@/actions/fetchActions";
import prisma from "../../../../prisma/db.config";
import CoinsMinus from "@/actions/CoinsMinus";
import {CoinsSpend} from "@/actions/CoinsSpend";
import { Document } from "@langchain/core/documents";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import {TokenTextSplitter} from "@langchain/textsplitters"
import {PromptTemplate} from "@langchain/core/prompts"
import { summaryTemplate } from "../../../../prompt/prompts";
import {loadSummarizationChain} from "langchain/chains"
import { gptModel } from "../../../../lang/langchain";
import UpdateSummary from "@/actions/UpdateSummary";

interface SummarizePayloadType {
    url: string,
    id: string,
}

class Summarize {
    static async summarize(req:NextRequest) {
        try {
            const session:CustomSession | null = await getServerSession(authOptions);

            if(!session) {
                return NextResponse.json({message: "Unauthorized"}, {status: 401})
            }
            const body:SummarizePayloadType = await req.json()

            const userCoins = await getUserCoin.getUserCoin(session.user?.id!);
            const currentCoins = userCoins?.coins ?? 0;

            if(userCoins == null || (userCoins?.coins < 10)) {
                const coinsneeded = 10 - currentCoins;
                return NextResponse.json({message: `You need ${coinsneeded} more coins to summarize. Please add more coins.`}, {status: 400});
            }

            const oldSummary = await prisma.summary.findFirst({
                where: {
                    url: body.url
                }
            })

            if(oldSummary && oldSummary.response) {
                await CoinsMinus.coinsminus(session.user?.id!)
                await CoinsSpend.coinsspend(session.user?.id!, body.id)

                return NextResponse.json({message: "Podcast video summary", data: oldSummary?.response})
            }
            
            let text : Document<Record<string, any>>[]
            try {
                const loader = YoutubeLoader.createFromUrl(body.url, {
                    language: "en",
                    addVideoInfo: true,
                    });
                    
                    text = await loader.load();
            } catch (error) {
                return NextResponse.json({ message: "Invalid URL" },{status: 404 });
            }

            const splitter = new TokenTextSplitter({
                chunkSize: 10000,
                chunkOverlap: 250,
            })

            const textSummary = await splitter.splitDocuments(text);

            const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplate)

            const summaryChain = loadSummarizationChain(gptModel, {
                type: "map_reduce",
                verbose: true,
                combinePrompt: summaryPrompt
            })

            const res = await summaryChain.invoke({input_documents: textSummary})

            await CoinsMinus.coinsminus(session.user?.id!)
            await CoinsSpend.coinsspend(session.user?.id!, body.id)
            await UpdateSummary.updatesummary(body.id, res?.text)

            return NextResponse.json({
                message: "Podcast video summary",
                data: res?.text,
            })
            
        } catch (error) {
            return NextResponse.json(
                {message: "Error processing podcast video summary"},
                {status: 500},
            )
        }
    }
}

export default Summarize