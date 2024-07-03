import Logo from "../atoms/Logo";

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between rounded-lg px-6 py-7 border border-red-400">
      <div className="flex flex-col gap-5 items-center">
        <Logo />
      </div>
    </div>
  );
}
