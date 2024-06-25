import "@/styles/globals.css";
import Navbar from "@/ui/molecules/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
import { AI } from "./actions/ai";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";

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
  const user = await currentUser();
  let history = [];

  if (user) {
    history = await db.query.messages.findMany({
      where: (messages, { eq }) => eq(messages.conversationId, "1"),
      columns: {
        role: true,
        content: true,
      },
    });
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
