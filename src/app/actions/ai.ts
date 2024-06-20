"use server";

import { openai } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";
import { createAI, createStreamableValue } from "ai/rsc";
import { ReactNode } from "react";

export async function sendMessage(messages: CoreMessage[]) {
  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

// Define the AI state and UI state types
export type ServerMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ClientMessage = {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
};

export type AIState = ServerMessage[];
export type UIState = ClientMessage[];

// Create the AI provider with the initial states and allowed actions
export const AI = createAI<AIState, UIState>({
  initialAIState: [],
  initialUIState: [],
  actions: {
    sendMessage,
  },
});
