import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  conversation_id: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { conversation_id } = (await req.json()) as RequestBody;

  const messages = await db.query.messages.findMany({
    where: (messages, { eq }) => eq(messages.conversationId, conversation_id),
  });

  const coreMessages = messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));

  return new NextResponse(JSON.stringify(coreMessages), { status: 200 });
}
