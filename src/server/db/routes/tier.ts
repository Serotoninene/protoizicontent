import { db } from "..";
import { users } from "../schema";

import { eq } from "drizzle-orm";

export async function getTierByProductId(productId: string) {
  try {
    const tier = await db.query.tiers.findFirst({
      where: (tiers, { eq }) => eq(tiers.productId, productId),
    });
    if (!tier) throw new Error("No tier found for product ID: " + productId);
    return tier;
  } catch (e) {
    console.log("Error fetching tier: ", e);
    throw e;
  }
}

export async function updateUserTier(
  customerId: string,
  tierId: string | null,
) {
  try {
    if (!tierId) throw new Error("No tier Id");

    await db
      .update(users)
      .set({
        tierId: tierId,
      })
      .where(eq(users.stripeCustomerId, customerId));
  } catch (e) {
    console.log("Error updating user tier in DB: ", e);
    throw e;
  }
}
