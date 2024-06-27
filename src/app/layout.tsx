import "@/styles/globals.css";
import { db } from "@/server/db";
import { conversations } from "@/server/db/schema";
import { AI, type ServerMessage } from "./actions/ai";

import Navbar from "@/ui/molecules/Navbar";

import { v4 as uuid } from "uuid";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "BuzzClip",
  description: "Transforming Ideas into Engaging Videos Effortlessly!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function Providers({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}

type Conversation = {
  id: string;
  userId: string;
  moodId: string;
  createdAt: Date | null;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the current user and their message history
  const user = await currentUser();
  let history: ServerMessage[] = [];
  let conversation: Conversation | undefined;

  if (!user?.id) {
  } else {
    conversation = await db.query.conversations.findFirst({
      where: (conversations, { eq }) => eq(conversations.userId, user.id),
    });

    if (!conversation) {
      console.log("no conversation");

      const newConversation = await db
        .insert(conversations)
        .values({
          id: uuid(),
          userId: user.id,
        })
        .returning();

      conversation = newConversation[0];
    }

    if (conversation?.id) {
      history = await db.query.messages.findMany({
        where: (messages, { eq }) =>
          eq(messages.conversationId, conversation!.id),
        columns: {
          role: true,
          content: true,
        },
      });
    }
  }

  return (
    <Providers>
      <AI initialAIState={history}>
        <html lang="en">
          <body
            className={`font-sans ${inter.variable} text-primary-700 px-6 pt-7 max-w-[1077px] mx-auto`}
          >
            <Navbar />
            {children}
          </body>
        </html>
      </AI>
    </Providers>
  );
}
