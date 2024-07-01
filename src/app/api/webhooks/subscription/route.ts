import type Stripe from "stripe";
import stripe from "@/server/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

import { updateTierByCustomerId } from "@/server/db/routes/tier";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("Stripe-Signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

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

  const eventType = event.type;
  let data;
  let customerId;
  let productId: string | undefined;

  switch (eventType) {
    case "customer.subscription.created":
      console.log("Subscription created");
      // Get the subscription from the event
      break;
    case "customer.subscription.updated":
      data = event.data.object;
      customerId = data.customer;
      productId = data.items.data[0]?.plan.id;

      if (customerId && productId) {
        await updateTierByCustomerId(customerId as string, productId);
      }

      break;
    case "customer.subscription.deleted":
      data = event.data.object;
      customerId = data.customer;

      if (customerId) {
        await updateTierByCustomerId(customerId as string);
      }

      break;
    case "invoice.payment_succeeded":
      data = event.data.object;
      customerId = data.customer;
      productId = data.lines.data[0]?.plan?.id;

      if (customerId && productId) {
        await updateTierByCustomerId(customerId as string, productId);
      }

      break;
    default:
      console.log("Unhandled event type", eventType);
      break;
  }

  return new NextResponse("Webhook received", { status: 200 });
}
