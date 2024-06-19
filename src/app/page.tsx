import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";
import { conversations } from "@/server/db/schema";

// Components of the page
import Hero from "./_components/Hero";
import Content from "./_components/Content";
import Pricing from "./_components/Pricing";
import CTASection from "./_components/CTASection";
import Footer from "@/ui/molecules/Footer";

// Ui components
import Chatbot from "@/ui/organisms/Chatbot";

export default async function HomePage() {
  const user = await currentUser();
  let conversation;

  if (user?.id) {
    conversation = await db.query.conversations.findFirst({
      where: (conversations, { eq }) => eq(conversations.userId, user.id),
    });

    if (!conversation) {
      await db.insert(conversations).values({
        id: "1",
        userId: user.id,
      });
    }
  }

  return (
    <main className="relative min-h-screen h-screen z-0">
      <Hero />
      <Content />
      <Pricing />
      <CTASection />
      <Footer />
      <Chatbot />
    </main>
  );
}
