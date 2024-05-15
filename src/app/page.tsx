import Hero from "./_components/Hero";
import Content from "./_components/Content";
import Pricing from "./_components/Pricing";
import CTASection from "./_components/CTASection";
import Footer from "@/ui/molecules/Footer";

export default async function HomePage() {
  const url =
    "https://cdn.creatomate.com/renders/0f4aade0-521d-4059-8f08-751a83c27f79.mp4";
  console.log(url.length);
  return (
    <main className="relative min-h-screen h-screen z-0">
      <Hero />
      <Content />
      <Pricing />
      <CTASection />
      <Footer />
    </main>
  );
}
