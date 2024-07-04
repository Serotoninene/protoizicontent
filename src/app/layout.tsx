import "@/styles/globals.css";
import { AI, type ServerMessage } from "../server/actions/ai";

import { getConversationOnInit } from "@/server/db/routes/conversation";
import { getChatHistory } from "@/server/db/routes/messages";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the current user and their message history
  const user = await currentUser();
  let history: ServerMessage[] = [];

  if (user?.id) {
    const conversation = await getConversationOnInit(user.id);
    if (conversation?.id) history = await getChatHistory(conversation.id);
  }

  return (
    <Providers>
      <AI initialAIState={history}>
        <html lang="en">
          <body
            className={`font-sans ${inter.variable} text-primary-700 px-6 pt-7 xl max-w-[1280px] mx-auto bg-[#F7F5F5]`}
          >
            {children}
          </body>
        </html>
      </AI>
    </Providers>
  );
}
