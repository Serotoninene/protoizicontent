import "@/styles/globals.css";
import Navbar from "@/ui/molecules/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`font-sans ${inter.variable} text-primary-700 px-6 pt-7 max-w-[1077px] mx-auto`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
