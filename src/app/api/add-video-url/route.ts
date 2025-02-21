import { NextRequest, NextResponse } from "next/server";
import AddUrl from "../services/AddUrl";

export async function POST(req: NextRequest) {
    return AddUrl.addurl(req);
}