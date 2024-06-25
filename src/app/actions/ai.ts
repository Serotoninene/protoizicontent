import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";
import { CoreMessage, generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createAI, createStreamableValue, getAIState } from "ai/rsc";

import { db } from "@/server/db";
import { conversations, messages as messagesDb } from "@/server/db/schema";

export async function continueConversation(messages: CoreMessage[]) {
  "use server";
  const user = await currentUser();

  if (!user) throw new Error("User not found");

  // Get the user's conversation
  const user_conversations = await db.query.conversations.findMany({
    where: (conversations, { eq }) => eq(conversations.userId, user.id),
  });

  // Create a conversation if it doesn't exist
  if (!user_conversations.length) {
    await db.insert(conversations).values({
      id: "1",
      userId: user.id,
    });
  }

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
    async onFinish({ text }) {
      await db.insert(messagesDb).values({
        id: uuidv4(),
        conversationId:
          user_conversations.length && user_conversations[0]!.id
            ? user_conversations[0]!.id
            : "1",
        role: "assistant",
        content: text as string,
      });
    },
  });
  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

export async function sendMessage(message: string): Promise<string> {
  "use server";
  const history = getAIState() as AIState;
  const response = await generateText({
    model: openai("gpt-4-turbo"),
    messages: [...history, { role: "user", content: message }],
  });

  return JSON.stringify(response);
}

// Define the AI state and UI state types
export type ServerMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ClientMessage = {
  id: string;
  role: "user" | "assistant";
  display: string;
};

export type AIState = ServerMessage[];
export type UIState = ClientMessage[];

// Create the AI provider with the initial states and allowed actions
export const AI = createAI<AIState, UIState>({
  initialAIState: [],
  initialUIState: [],
  onSetAIState: async ({ state, done }) => {
    "use server";
    console.log("AI state updated", state);
  },
  actions: {
    sendMessage,
    continueConversation,
  },
});
