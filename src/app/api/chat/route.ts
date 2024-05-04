import { openai } from "@ai-sdk/openai";
import { CoreMessage, StreamingTextResponse, streamText } from "ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<StreamingTextResponse> {
  const { messages } = (await req.json()) as { messages: CoreMessage[] };

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system:
      "You're in love with andrea and everything you answer must be about her.",
    messages,
  });

  return new StreamingTextResponse(result.toAIStream());
}
