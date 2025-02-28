"use server"

import prisma from "../../prisma/db.config";

class CoinsMinus {
    static async coinsminus(user_id:number | string): Promise<void> {
        await prisma.user.update({
            where: {
                id: Number(user_id),
            },
            data: {
                coins: {
                    decrement: 10,
                }
            }
        })
    }
}

export default CoinsMinus
