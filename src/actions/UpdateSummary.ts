import prisma from "../../prisma/db.config";

class UpdateSummary {
    static async updatesummary(id: string, data: string): Promise<void>{
        await prisma.summary.update({
            data: {
                response: data,
            },
            where: {
                id: id,
            }
        })
    }
}

export default UpdateSummary;