import { db } from "@/server/db";
import { conversations } from "@/server/db/schema";

import { v4 as uuid } from "uuid";

type Conversation = {
  id: string;
  userId: string;
  moodId: string;
  createdAt: Date | null;
};

export const createConversation = async (userId: string) => {
  const newConversation = await db
    .insert(conversations)
    .values({
      id: uuid(),
      userId: userId,
    })
    .returning();

  return newConversation[0];
};

export const getConversationOnInit = async (userId: string) => {
  let conversation: Conversation | undefined;

  conversation = await db.query.conversations.findFirst({
    where: (conversations, { eq }) => eq(conversations.userId, userId),
  });

  // If the conversation does not exist, create the default one
  if (!conversation) {
    conversation = await createConversation(userId);
  }

  return conversation;
};
