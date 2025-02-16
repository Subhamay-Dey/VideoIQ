import prisma from "@/lib/db.config";
import {unstable_cache} from "next/cache"

class getUserCoin {
    static getUserCoin = unstable_cache(async (userid: number | string) => {
        const userCoins = await prisma.user.findUnique({
            select: {
                coins: true,
            },
            where: {
                id: Number(userid),
            }
        });
        return userCoins;
    },
    ["userCoins"], 
    { revalidate: 600, tags: ["userCoins"] });
}

export default getUserCoin;