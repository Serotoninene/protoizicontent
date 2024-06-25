import { openai } from "@ai-sdk/openai";
import {
  StreamData,
  StreamingTextResponse,
  streamText,
  type CoreMessage,
} from "ai";
import { v4 as uuidv4 } from "uuid";

import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/server/db";
import { messages as messagesDb } from "@/server/db/schema";

export async function POST(req: NextRequest): Promise<StreamingTextResponse> {
  try {
    const { messages, conversation_id } = (await req.json()) as {
      messages: CoreMessage[];
    };

    const initialMessages = await db.query.messages.findMany({
      where: (messages, { eq }) =>
        eq(messages.conversationId, conversation_id as string),
    });

    console.log(initialMessages);

    // needs to get the message history thhrough the conversation_id
    const result = await streamText({
      model: openai("gpt-4-turbo"),
      messages: messages,
      system: "chat",
    });

    const dataStream = new StreamData();

    dataStream.append({ previousMessages: JSON.stringify(initialMessages) });

    const stream = result.toAIStream({
      async onFinal(data) {
        // Save the message to the database
   
        });

        await dataStream.close();
      },
    });

    return new StreamingTextResponse(stream, {});
  } catch (e) {
    console.log(e);
    return new NextResponse("Error", { status: 500 });
  }
}
