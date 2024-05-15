import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import stripe from "@/server/lib/stripe";

type NewUser = Omit<typeof users.$inferInsert, "stripeCustomerId">;

export const insertUser = async (user: NewUser) => {
  const stripeCustomer = await stripe.customers.create({
    email: user.email ?? undefined,
    name: `${user.firstName} ${user.lastName}` ?? undefined,
    phone: user.phone ?? undefined,
  });

  return await db.insert(users).values({
    id: user.id,
    email: user.email,
    role: "basic",
    firstName: user.firstName,
    lastName: user.lastName,
    stripeCustomerId: stripeCustomer.id,
    phone: user.phone,
    image: user.image,
  });
};
