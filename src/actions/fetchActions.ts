import prisma from "@/lib/db.config";

class getUserCoin {
    static async getUserCoin(userid: number | string) {
        const userCoins = await prisma.user.findUnique({
            select: {
                coins:true
            },
            where: {
                id: typeof userid === 'string' ? parseInt(userid) : userid,
            }
        })
        return userCoins;
    }
}

export default getUserCoin