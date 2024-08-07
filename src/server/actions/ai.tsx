/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import type { ReactNode } from "react";

import { db } from "@/server/db";
import { getConversationOnInit } from "@/server/db/routes/conversation";
import { messages } from "@/server/db/schema";

import { openai } from "@ai-sdk/openai";
import { generateId, streamObject } from "ai";
import {
  createAI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
  streamUI,
} from "ai/rsc";

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

interface Quote {
  setup: string;
  inBetween: string;
  conclusion: string;
}

export async function generateContent(input: string) {
  const history = getMutableAIState();
  const stream = createStreamableValue<Quote>();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4-turbo"),
      system:
        "generate 3 quotes on the topic precised in the prompt. the quotes should never the same and should be unique",
      messages: [...history.get(), { role: "user", content: input }],
      schema: z.object({
        quotes: z.array(
          z.object({
            setup: z.string().describe("the setup of the sentence"),
            inBetween: z
              .string()
              .describe(
                "the element that disrupts or surprises, providing a shocking or unexpected twist between the setup and conclusion",
              ),
            conclusion: z
              .string()
              .describe("the conclusion/punchline of the sentence"),
          }),
        ),
      }),
      onFinish: ({ object }) => {
        history.done((messages: ClientMessage[]) => [
          ...messages,
          { role: "user", content: input },
          {
            role: "assistant",
            content: JSON.stringify(object?.quotes),
          },
        ]);
      },
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
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
