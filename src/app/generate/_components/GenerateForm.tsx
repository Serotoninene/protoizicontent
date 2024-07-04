import Divider from "@/ui/atoms/Divider";
import SecondaryButton from "@/ui/atoms/SecondaryButton";

const Header = () => (
  <div>
    <h2 className="text-xl font-bold mb-1">Pick a theme</h2>
    <p className="text-sm text-primary-400">
      Pick one of the pre-registered topics
    </p>
  </div>
);

const TextInput = () => (
  <div className="flex flex-col gap-3">
    <label htmlFor="prompt" className="text-sm text-primary-400">
      Type in the precise topic you seek.
    </label>
    <div className="relative">
      <textarea
        id="prompt"
        placeholder="Type in your prompt here..."
        className="w-full rounded-lg blurred_background-2xl py-3 px-4 h-24 text-sm focus:outline-none"
        style={{ resize: "none" }}
      />
      <div className="absolute bottom-4 right-4 px-3 py-2 text-primary-400 text-xs font-medium bg-white rounded-full">
        ⌘ + Ent
      </div>
    </div>
  </div>
);

export default function GenerateForm() {
  return (
    <div className="relative">
      <div className="absolute h-24 w-8 top-4 left-2 bg-secondary-400 rounded-md"></div>
      <div className="absolute rounded-full h-20 w-20 bottom-44 right-2 bg-secondary-400 rounded-md"></div>
      <div className="absolute rounded-full h-32 w-40 bottom-4 right-2 bg-secondary-400 rounded-md"></div>
      <form className="blurred_background-2xl flex flex-col gap-6 px-6 py-10 rounded-xl md:min-w-[536px]">
        <Header />
        <ul className="flex justify-center items-center gap-8">
          <li>
            <SecondaryButton>Philosophy</SecondaryButton>
          </li>
          <li>
            <SecondaryButton>Self-Improvement</SecondaryButton>
          </li>
          <li>
            <SecondaryButton>Comedy</SecondaryButton>
          </li>
        </ul>

        <Divider />

        <TextInput />
      </form>
    </div>
  );
}
