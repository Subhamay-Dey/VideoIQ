"use server"

import prisma from "../../prisma/db.config";

class CoinsSpend {
    static async coinsspend(user_id:string | number, summary_id: string): Promise<void> {
        await prisma.coinSpend.create({
            data: {
                user_id: Number(user_id),
                summary_id: summary_id,
            }
        })
    }
}

export default CoinsSpend