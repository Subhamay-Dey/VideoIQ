import prisma from "@/lib/db.config";

class GetSummary {
    static async getSummary(id:string) {
        const summary = await prisma.summary.findUnique({
            where: {
                id: id,
            },
        })
        return summary;
    }
}

export default GetSummary;