// Components of the page
import Footer from "@/ui/molecules/Footer";
import CTASection from "./_components/CTASection";
import Content from "./_components/Content";
import Hero from "./_components/Hero";
import Pricing from "./_components/Pricing";

// Ui components
import Chatbot from "@/ui/organisms/Chatbot";

// Packages

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
