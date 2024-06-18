import Hero from "./_components/Hero";
import Content from "./_components/Content";
import Pricing from "./_components/Pricing";
import CTASection from "./_components/CTASection";
import Footer from "@/ui/molecules/Footer";
import PromptGenerator from "@/ui/organisms/PromptGenerator";
import { Prompt } from "next/font/google";

export default async function HomePage() {
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
