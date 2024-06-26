import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import stripe from "@/server/lib/stripe";

type NewUser = Omit<typeof users.$inferInsert, "stripeCustomerId">;

export const createUser = async (user: NewUser) => {
  const stripeCustomer = await stripe.customers.create({
    email: user.email ?? undefined,
    name: `${user.firstName} ${user.lastName}` ?? undefined,
    phone: user.phone ?? undefined,
  });

  return await db.insert(users).values({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role ?? "USER",
    stripeCustomerId: stripeCustomer.id,
    phone: user.phone,
    image: user.image,
  });
};
