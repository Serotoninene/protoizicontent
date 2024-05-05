import PromptGenerator from "./_components/PromptGenerator";
import VideoGenerator from "./_components/VideoGenerator";

export default async function HomePage() {
  return (
    <main className="min-h-screen h-screen">
      <PromptGenerator />
      {/* <VideoGenerator /> */}
    </main>
  );
}
