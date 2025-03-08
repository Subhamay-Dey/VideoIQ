import { NextRequest } from "next/server";
import { Transaction } from "../services/Transactions";

export async function POST(req: NextRequest) {
    return Transaction.transaction(req)
}