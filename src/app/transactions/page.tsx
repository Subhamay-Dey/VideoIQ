'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { loadRazorpayScript } from '@/lib/loadRazorpayScript';

interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD')

  const productName = "Getkit: Best Nextjs SaaS kit"
  const productDescription = "Built-in authentication, database, backend, and payments"
  const priceUSD = 19
  const priceINR = 1599

  const handleCurrencyChange = (value: string) => {
    setCurrency(value as 'USD' | 'INR')
  }

  const handlePayment = async () => {
    const isRazorpayLoaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    
    if (!isRazorpayLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      return;
    }

    try {
        const amount = currency === 'USD' ? priceUSD * 100 : priceINR * 100;
      
        const response = await fetch("/api/createPayment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, currency }),
        });
      
        const orderData: RazorpayOrderResponse = await response.json();
      
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
          amount: orderData.amount.toString(),
          currency: orderData.currency,
          name: "GetStart Kit",
          image: "/logo.png",
          description: "Get your SaaS kit for one-time payment",
          order_id: orderData.id,
          handler: function (response: any) {
            alert("Payment successful!");
          },
          prefill: {
            name: "Your Name",
            email: "email@example.com",
            contact: "1234567890",
          },
          theme: {
            color: "#A594F9"
          },
        };
      
        const rzp1 = new window.Razorpay(options);
        rzp1.open();    
    } catch (error) {
      console.error("Error during payment", error);
      alert("There was an error initiating the payment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-6xl w-full h-full overflow-hidden flex flex-col md:flex-row">
        <div className="flex flex-col md:flex-row h-full gap-8">
          {/* Left column - Image */}
          {/* <div className="md:w-1/2 relative h-full">
            <Image
              width={700}
              height={700}
              src="/sidePic.png"
              alt="Getkit product image"
              style={{ objectFit: 'cover' }}
            />
          </div> */}

          {/* Right column - Product details */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-3xl font-bold mb-2">{productName}</h1>
              <p className="text-muted-foreground mb-6">{productDescription}</p>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold">
                  {currency === 'USD' ? `$${priceUSD}` : `₹${priceINR}`}
                </span>
                <Select onValueChange={handleCurrencyChange} defaultValue={currency}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handlePayment}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}