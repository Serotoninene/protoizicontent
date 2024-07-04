import SecondaryButton from "@/ui/atoms/SecondaryButton";

const Header = () => (
  <div>
    <h2 className="text-xl font-bold mb-1">Pick a theme</h2>
    <p className="text-sm text-primary-400">
      Pick one of the pre-registered topics
    </p>
  </div>
);

export default function GenerateForm() {
  return (
    <div className="blurred_background-2xl flex flex-col gap-6 px-6 py-10 rounded-xl">
      <Header />
      <ul className="flex justify-center items-center gap-8">
        <li>
          <SecondaryButton>Philosophy</SecondaryButton>
        </li>
        <li>
          <SecondaryButton>Philosophy</SecondaryButton>
        </li>
        <li>
          <SecondaryButton>Philosophy</SecondaryButton>
        </li>
      </ul>
    </div>
  );
}
