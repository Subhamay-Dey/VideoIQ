import { revalidateTag, unstable_cache } from "next/cache";
import prisma from "../../prisma/db.config";

class CoinsSpendHistory {
    static coinsspendhistory = unstable_cache(async(user_id: number | string) => {
        return await prisma.coinSpend.findMany({
            include: {
                summary: {
                    select: {
                        id: true,
                        url: true,
                        title: true                    }
                }
            },
            orderBy: {
                id: "desc"
            },
            where: {
                user_id: Number(user_id)
            }
        })
    },
    ["coinsSpend"],
    {revalidate: 60 * 60, tags: ["coinsSpend"]})
}

export {CoinsSpendHistory}