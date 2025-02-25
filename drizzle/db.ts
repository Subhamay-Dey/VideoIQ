import {drizzle as Drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";

const db = postgres(process.env.DATABASE_URL!);
const drizzle = Drizzle(db);

export {drizzle};