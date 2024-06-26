/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import { db } from "@/server/db";
import { getConversationOnInit } from "@/server/db/routes/conversation";
import { messages } from "@/server/db/schema";
import { openai } from "@ai-sdk/openai";
import { currentUser } from "@clerk/nextjs/server";
import { generateId } from "ai";
import { createAI, getAIState, getMutableAIState, streamUI } from "ai/rsc";
import { ReactNode } from "react";

export interface ServerMessage {
  role: string; // "user" | "assistant" | "function";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: string; // "user" | "assistant" | "function";
  display: ReactNode;
}

export async function continueConversation(
  input: string,
): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();

  const result = await streamUI({
    model: openai("gpt-3.5-turbo"),
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "user", content: input },
          { role: "assistant", content },
        ]);
      }

      return <div className="bg-red-400">{content}</div>;
    },
  });

  return {
    id: generateId(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  onSetAIState: async ({ state, done }) => {
    "use server";
    const user = await currentUser();
    const conversation = await getConversationOnInit(user!.id);

    if (done) {
      for (let i = state.length - 2; i < state.length; i++) {
        // saving the user's prompt and the ai answer in the db
        await db.insert(messages).values({
          id: generateId(),
          conversationId: conversation!.id,
          role: state[i]?.role as "assistant" | "user",
          content: state[i]?.content ?? "",
        });
      }
    }
  },
  onGetUIState: async () => {
    "use server";
    // @ts-expect-error - This is a server-side function
    const history: ServerMessage[] = getAIState();

    return history.map(({ role, content }) => ({
      id: generateId(),
      role,
      display: content,
    }));
  },
});
