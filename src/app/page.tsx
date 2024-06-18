import Footer from "@/ui/molecules/Footer";
import PromptGenerator from "@/ui/organisms/PromptGenerator";
import CTASection from "./_components/CTASection";
import Content from "./_components/Content";
import Hero from "./_components/Hero";
import Pricing from "./_components/Pricing";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { conversations } from "@/server/db/schema";

export default async function HomePage() {
  const user = await currentUser();
  let conversation;

  if (user?.id) {
    conversation = await db.query.conversations.findFirst({
      where: (conversations, { eq }) => eq(conversations.userId, user.id),
    });

    console.log(conversation);

    if (!conversation) {
      console.log("creating a new conv");
      await db.insert(conversations).values({
        id: "1",
        userId: user.id,
      });
    }
  }

  return (
    <main className="relative min-h-screen h-screen z-0">
      <PromptGenerator />
      <Hero />
      <Content />
      <Pricing />
      <CTASection />
      <Footer />
    </main>
  );
}
