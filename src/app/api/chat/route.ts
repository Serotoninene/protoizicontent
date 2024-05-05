import { openai } from "@ai-sdk/openai";
import { NextRequest } from "next/server";
import { CoreMessage, StreamingTextResponse, streamText } from "ai";

export async function POST(req: NextRequest): Promise<StreamingTextResponse> {
  const { messages } = (await req.json()) as { messages: CoreMessage[] };

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system: "No introduction. Just tell me what you want to say. 50 words max",
    messages,
  });

  return new StreamingTextResponse(result.toAIStream());
}
