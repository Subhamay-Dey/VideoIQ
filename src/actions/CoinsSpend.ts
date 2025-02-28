import prisma from "../../prisma/db.config";

class CoinsMinus {
    static async coinsminus(user_id:number): Promise<void> {
        await prisma.user.update({
            where: {
                id: user_id,
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