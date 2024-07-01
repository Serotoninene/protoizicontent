import Stripe from "stripe";

import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { users } from "@/server/db/schema";
import stripe from "@/server/lib/stripe";

import { NextRequest, NextResponse } from "next/server";

const updateUserTier = (userId) => {};

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

  switch (eventType) {
    case "customer.subscription.created":
      console.log("Subscription created");
      // Get the subscription from the event
      break;
    case "customer.subscription.updated":
      // update the tier in the db
      const updateData = event.data.object;
      const updateCustomerId = updateData.customer;
      const updateProductId = updateData.items.data[0]?.plan.id;

      // Get the corresponding tier
      const updateTier = await db.query.tiers.findFirst({
        where: (tiers, { eq }) => eq(tiers.productId, updateProductId!),
      });

      try {
        if (!updateTier) throw new Error("no update tier id");

        await db
          .update(users)
          .set({
            tierId: updateTier.id,
          })
          .where(eq(users.stripeCustomerId, updateCustomerId as string));
      } catch (e) {
        console.log("error updating the tier in db : ", e);
      }

      break;
    case "customer.subscription.deleted":
      console.log("Subscription deleted");

      break;
    case "invoice.payment_succeeded":
      const invoice = event.data.object;
      const customerId = invoice.customer;
      const productId = invoice.lines.data[0]?.plan?.id;

      // Get the corresponding tier
      const tier = await db.query.tiers.findFirst({
        where: (tiers, { eq }) => eq(tiers.productId, productId!),
      });

      try {
        // Get the current user
        await db
          .update(users)
          .set({
            tierId: tier?.id,
          })
          .where(eq(users.stripeCustomerId, customerId as string));
      } catch (e) {
        console.log(e);
      }

      break;
    default:
      console.log("Unhandled event type", eventType);
      break;
  }

  return new NextResponse("Webhook received", { status: 200 });
}
