import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateText, streamText } from "ai";
import { createAI, createStreamableValue, getAIState } from "ai/rsc";
import { ReactNode } from "react";

export async function continueConversation(messages: CoreMessage[]) {
  "use server";
  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

export async function sendMessage(message: string) {
  "use server";
  console.log("start sendMessage");
  const history = getAIState() as AIState;

  console.log("got history : ", history);

  const response = await generateText({
    model: openai("gpt-3.5-turbo"),
    messages: [...history, { role: "user", content: message }],
  });

  console.log("after response : ", response);

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
  actions: {
    sendMessage,
  },
});
