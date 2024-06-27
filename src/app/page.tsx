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

// Packages
import { v4 as uuid } from "uuid";

export default async function HomePage() {
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
