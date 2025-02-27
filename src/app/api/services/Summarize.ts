import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from "../auth/[...nextauth]/options";
import getUserCoin from "@/actions/fetchActions";

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
            
        } catch (error) {
            
        }
    }
}