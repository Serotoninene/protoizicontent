import Hero from "./_components/Hero";
import Content from "./_components/Content";
import Pricing from "./_components/Pricing";
import CTASection from "./_components/CTASection";
import Footer from "@/components/Footer";

export default async function HomePage() {
  return (
    <main className="min-h-screen h-screen">
      <Hero />
      <Content />
      <Pricing />
      <CTASection />
      <Footer />
    </main>
  );
}
