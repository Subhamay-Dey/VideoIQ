import getUserCoin from "@/actions/fetchActions";
import AddUrlSchema from "@/validations/AddUrlValidation";
import vine, {errors} from "@vinejs/vine";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import {Document} from "@langchain/core/documents"

interface AddUrlBody {
    url: string;
    userid: string;
}

class AddUrl {
    static async addurl(req: NextRequest) {
        try {

            const token = await getToken({req});

            if(!token) {
                return NextResponse.json({ message: "Unauthorized" },{status: 401 });
            }

            const body:AddUrlBody = await req.json();
            const validator = vine.compile(AddUrlSchema);
            const payload = await validator.validate(body)

            const userCoins = await getUserCoin.getUserCoin(payload.userid);
            const currentCoins = userCoins?.coins ?? 0;

            if(userCoins === null || (userCoins?.coins < 10 )) {
                const coinsneeded = 10 - currentCoins;
                return NextResponse.json({ message: `You need ${coinsneeded} more coins to summarize. Please add more coins.` },{status: 400 });
            }

            let text : Document<Record<string, any>>[]
            try {
                const loader = YoutubeLoader.createFromUrl(payload.url, {
                    language: "en",
                    addVideoInfo: true,
                  });
                  
                  text = await loader.load();
            } catch (error) {
                return NextResponse.json({ message: "Invalid URL" },{status: 404 });
            }

            return NextResponse.json({ message: "Url added successfully", data: payload }, { status: 200 });

        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return NextResponse.json({ error: error.message }, { status: 422 });
            }
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }
    }
}

export default AddUrl;