import { db } from "@/server/db";
import { users } from "@/server/db/schema";

type NewUser = typeof users.$inferInsert;

export const insertUser = async (user: NewUser) => {
  return await db.insert(users).values({
    id: user.id,
    email: user.email,
    role: "basic",
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    image: user.image,
  });
};
