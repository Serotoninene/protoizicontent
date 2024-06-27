/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";
import { db } from "@/server/db";
import { messages } from "@/server/db/schema";
import { generateId } from "ai";
import { createAI, getAIState } from "ai/rsc";
import { ServerMessage, ClientMessage } from "./ai";

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  onSetAIState: async ({ state, done }) => {
    "use server";

    if (done) {
      for (let i = state.length - 2; i < state.length; i++) {
        // saving the user's prompt and the ai answer in the db
        await db.insert(messages).values({
          id: generateId(),
          conversationId: "1",
          role: state[i]?.role as "assistant" | "user",
          content: state[i]?.content ?? "",
        });
      }
    }
  },
  onGetUIState: async () => {
    "use server";
    // type
    const history: ServerMessage[] = getAIState();
    return history.map(({ role, content }) => ({
      id: generateId(),
      role,
      display: content,
    }));
  },
});
