"use server"

import prisma from "../../prisma/db.config";
import {unstable_cache} from "next/cache"
import { drizzle } from "../../drizzle/db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

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
    { revalidate: 6, tags: ["userCoins"] });
}

export default getUserCoin;

// class getUserCoin {
//     static getUserCoin = unstable_cache(
//       async (userid: number | string) => {
//         const userCoins = await drizzle
//           .select({ coins: users.coins })
//           .from(users)
//           .where(eq(users.id, Number(userid)))
//           .limit(1); // Ensure only one row is fetched
  
//         return userCoins[0] || null;
//       },
//       ["userCoins"],
//       { revalidate: 600, tags: ["userCoins"] }
//     );
//   }
  
//   export default getUserCoin;