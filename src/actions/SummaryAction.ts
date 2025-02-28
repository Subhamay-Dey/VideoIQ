"use server"

import prisma from "../../prisma/db.config";
import { drizzle } from "../../drizzle/db";
import { summary } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

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

// class GetSummary {
//     static async getSummary(id:string) {
//         const sumary = await drizzle
//         .select()
//         .from(summary)
//         .where(eq(summary.id, id))
//         .limit(1)

//         return sumary[0] || null;
//     }
// }

// export default GetSummary;