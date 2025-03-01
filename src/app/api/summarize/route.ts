import { NextRequest } from "next/server";
import Summarize from "../services/Summarize";

export async function POST(req: NextRequest) {
    return Summarize.summarize(req)
}