import { db } from "@/server/db";
import { conversations } from "@/server/db/schema";

export const createConversation = async (userId: string) => {
  return await db.insert(conversations).values({
    userId: userId,
  });
};
