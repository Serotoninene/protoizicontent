import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateText, streamText } from "ai";
import { createAI, createStreamableValue, getAIState } from "ai/rsc";

export async function continueConversation(messages: CoreMessage[]) {
  "use server";
  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

export async function sendMessage(message: string): Promise<string> {
  "use server";
  const history = getAIState() as AIState;
  const response = await generateText({
    model: openai("gpt-3.5-turbo"),
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
  actions: {
    sendMessage,
  },
});
