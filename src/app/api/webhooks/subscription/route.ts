import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import stripe from "@/server/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("Stripe-Signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  console.log("Received webhook");
  console.log(body, sig, webhookSecret);

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      throw new Error("Missing Stripe signature or webhook secret");
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.log(err);
    return new NextResponse("Invalid stripe webhook request", { status: 400 });
  }

  console.log(event.type);
}
