import { db } from "@/server/db";
import stripe from "@/server/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Tier } from "types";

// Function to handle subscription logic for a given tier
export async function handleSubscriptions(tier: Tier) {
  "use server";

  // Attempt to retrieve the current user's session
  const session = await currentUser();

  // If no session is found, redirect the user to sign in
  if (!session) {
    auth().redirectToSignIn();
    return;
  }

  // Retrieve the user from the database using the session ID
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session.id),
  });

  // Error handling for cases where the user or their Stripe customer ID is not found
  if (!user) throw new Error("User not found");
  if (!user.stripeCustomerId) throw new Error("Stripe customer not found");

  // Retrieve the user's existing subscriptions from Stripe
  const userSubscriptions = await stripe.subscriptions.list({
    customer: user.stripeCustomerId,
  });

  // If the user already has a subscription and want's to upgrade/downgrade
  if (userSubscriptions.data.length > 0 && tier.id !== "1") {
    // Extract the current subscription items
    const prevItems = userSubscriptions.data[0]!.items.data;

    // Prepare to delete previous subscription items before adding the new one
    const itemsParams = prevItems.map((item) => ({
      id: item.id,
      deleted: true,
    }));

    // Update the subscription on Stripe with the new tier
    await stripe.subscriptions.update(userSubscriptions.data[0]!.id, {
      items: [...itemsParams, { price: tier.productId, quantity: 1 }],
    });

    return;
  } else if (userSubscriptions.data.length > 0 && tier.id === "1") {
    // if the user already has a subscription and wants out of it
    // Log a message if the user is trying to subscribe to the base tier but already has a subscription
    console.log("Need to delete the subscription");
    return;
  }

  // Create a new Stripe checkout session for the subscription if no existing subscription is found
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card", "paypal", "link"],
    customer: user.stripeCustomerId,
    line_items: [
      {
        price: tier.productId,
        quantity: 1,
      },
    ],
    // Redirect URLs after checkout success or cancellation
    success_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  });

  // Redirect the user to the Stripe checkout session URL (where he/she'll make the payment)
  if (!stripeSession.url) throw new Error("Stripe session not found");
  redirect(stripeSession.url);
}
