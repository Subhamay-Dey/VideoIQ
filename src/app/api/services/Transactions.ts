import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET_ID!
});

class Transaction {
    static async transaction(req: NextRequest) {
        const {amount,currency} = await req.json();

        if (!amount || !currency) {
            return NextResponse.json({ error: "Invalid payment details" }, { status: 400 });
        }

        const order  = await razorpay.orders.create({
            amount,
            currency
        });

        return NextResponse.json(order);
    }
}

export {Transaction}