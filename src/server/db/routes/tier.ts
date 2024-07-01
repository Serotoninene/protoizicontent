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

export async function updateTierByCustomerId(
  customerId: string,
  productId?: string,
) {
  try {
    // Get the corresponding tier
    if (!customerId) throw new Error("no customer id");
    let tier;
    if (productId) tier = await getTierByProductId(productId);

    await db
      .update(users)
      .set({
        tierId: productId ? tier?.id : "1",
      })
      .where(eq(users.stripeCustomerId, customerId));
  } catch (e) {
    console.log("error updating the tier in db : ", e);
  }
}
