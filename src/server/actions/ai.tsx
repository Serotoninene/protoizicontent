/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import type { ReactNode } from "react";

import { db } from "@/server/db";
import { getConversationOnInit } from "@/server/db/routes/conversation";
import { messages } from "@/server/db/schema";

import { openai } from "@ai-sdk/openai";
import { generateId, streamObject } from "ai";
import { createAI, getAIState, getMutableAIState, streamUI } from "ai/rsc";

import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

export interface ServerMessage {
  role: string; // "user" | "assistant" | "function";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: string; // "user" | "assistant" | "function";
  display: ReactNode;
}

export interface ClientObject {
  id: string;
  role: string;
  display: string;
}
export async function generateContent(input: string): Promise<ClientObject> {
  console.log("hello");
  const history = getMutableAIState();

  const result = await streamObject({
    model: openai("gpt-3.5-turbo"),
    messages: [...history.get(), { role: "user", content: input }],
    schema: z.object({
      setup: z.string().describe("the setup of the sentence"),
      conclusion: z
        .string()
        .describe("the conclusion/punchline of the sentence"),
    }),
  });

  const collectedResults = [];

  for await (const partialObject of result.partialObjectStream) {
    collectedResults.push(partialObject);
  }

  const lastResult = collectedResults[collectedResults.length - 1];
  // i just want the value of the setup and the value of the conclusion and join them in the same string
  const stringifiedLastResult =
    lastResult?.setup + " " + lastResult?.conclusion;

  console.log(stringifiedLastResult);

  history.done((messages: ServerMessage[]) => [
    ...messages,
    { role: "user", content: input },
    { role: "assistant", content: stringifiedLastResult },
  ]);

  // Serialize the collected results to a string or array of strings
  const displayData = collectedResults.map((obj) => ({
    setup: obj.setup,
    conclusion: obj.conclusion,
  }));

  return {
    id: generateId(),
    role: "assistant",
    display: JSON.stringify(displayData), // Ensure the data is serializable
  };
}

export async function continueConversation(
  input: string,
): Promise<ClientMessage> {
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
    generateContent,
  },
  onSetAIState: async ({ state, done }) => {
    const user = await currentUser();
    const conversation = await getConversationOnInit(user!.id);

    if (done) {
      console.log("the message of the ai is done, saving the conversation");
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
    // @ts-expect-error - This is a server-side function
    const history: ServerMessage[] = getAIState();
    return history.map(({ role, content }) => ({
      id: generateId(),
      role,
      display: content,
    }));
  },
});
