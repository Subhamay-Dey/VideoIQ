import { unstable_cache } from "next/cache";
import prisma from "../../prisma/db.config";

class OldSummaries {
    static oldSummaries = unstable_cache(async(user_id: number | string) => {
        return await prisma.summary.findMany({
            select: {
                id: true,
                url: true,
                title: true,
                createdAt: true,
                user_id: true
            },
            where: {
                user_id: Number(user_id),
            }
        });
    },
    ["oldsummaries"],
    { revalidate: 600, tags: ["oldsummaries"] });
}

export {OldSummaries}

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