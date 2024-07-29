import Sidebar from "@/ui/molecules/Sidebar";

export default function Layoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-56px)] md:gap-6">
      <div className="absolute left-2 top-2 bottom-2">
        <Sidebar />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
