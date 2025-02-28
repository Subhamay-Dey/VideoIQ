"use server"

import prisma from "../../prisma/db.config";

class CoinsAdd {
    static async coinsadd(user_id:number | string, coins: number): Promise<void> {
        await prisma.user.update({
            where: {
                id: Number(user_id),
            },
            data: {
                coins: {
                    increment: coins,
                }
            }
        })
    }
}

export default CoinsAdd