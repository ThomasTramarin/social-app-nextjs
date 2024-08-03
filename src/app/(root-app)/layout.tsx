import Bottombar from "@/components/layout/Bottombar";
import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="flex">
        <Sidebar />

        <section className="main-container">
          <div className="w-full max-w-4xl">{children}</div>
        </section>
      </main>

      <Bottombar />
    </div>
  );
}
