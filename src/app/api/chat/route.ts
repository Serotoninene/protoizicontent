import { openai } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText, type CoreMessage } from "ai";

import { type NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<StreamingTextResponse> {
  const { messages, conversation_id } = (await req.json()) as {
    messages: CoreMessage[];
  };

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages: messages,
    system: "chat",
  });

  const stream = result.toAIStream({
    async onFinal(data) {
      // Save the conversation to the database
    },
  });

  return new StreamingTextResponse(stream, {});
}
