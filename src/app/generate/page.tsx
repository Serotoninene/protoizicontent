import GenerateForm from "./_components/GenerateForm";
import ProgressTracker from "./_components/ProgressTracker";

export default function Generate() {
  return (
    <div className="relative flex h-full justify-center items-center rounded-lg border border-secondary-50 border-opacity-70">
      <GenerateForm />
      <ProgressTracker />
    </div>
  );
}
