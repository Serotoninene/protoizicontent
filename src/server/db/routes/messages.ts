import { db } from "..";

export const getChatHistory = async (conversationId: string) => {
  const history = await db.query.messages.findMany({
    where: (messages, { eq }) => eq(messages.conversationId, conversationId),
    columns: { role: true, content: true },
  });

  return history;
};
