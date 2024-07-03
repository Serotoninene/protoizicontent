import Sidebar from "@/ui/molecules/SideBar";

export default function Layoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-56px)] md:gap-6">
      <Sidebar />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
