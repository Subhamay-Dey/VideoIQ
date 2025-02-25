import {drizzle as Drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";

const db = postgres(process.env.DATABASE_URL!, {
    debug(connection, query, parameters) {
        console.log("Drizzle Query:", query, parameters);
    },
});

const drizzle = Drizzle(db);

export async function safeQuery<T>(query: Promise<T>): Promise<T | null> {
    try {
      return await query;
    } catch (error) {
      console.error("Drizzle Query Error:", error);
      return null;
    }
  }

export {drizzle};