import { openai } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText, type CoreMessage } from "ai";
import { v4 as uuidv4 } from "uuid";

import { type NextRequest } from "next/server";
import { db } from "@/server/db";
import { messages as messagesDb } from "@/server/db/schema";

export async function POST(req: NextRequest): Promise<StreamingTextResponse> {
  const { messages, conversation_id } = (await req.json()) as {
    messages: CoreMessage[];
  };

  // needs to get the message history thhrough the conversation_id

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages: messages,
    system: "chat",
  });

  const stream = result.toAIStream({
    async onFinal(data) {
      // Save the message to the database
      await db.insert(messagesDb).values({
        id: uuidv4() as string, // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        conversationId: conversation_id as string,
        role: "assistant",
        content: data,
      });
    },
  });

  return new StreamingTextResponse(stream, {});
}
