import { RightContainer } from "@/components/RightContainer";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="sm:flex sm:items-stretch">
      {/* sidebar */}
      <aside className="sm:min-h-screen sm:w-fit p-4 sm:pr-2">
        <div className="p-4 h-full border border-primary/20 rounded-xl bg-secondary">
          <Sidebar />
        </div>
      </aside>

      {/* right container */}
      <section className="sm:min-h-screen w-full p-4 sm:pl-2">
        <div className="p-8 h-full border border-primary/20 rounded-xl bg-secondary">
          <RightContainer />
        </div>
      </section>
    </main>
  );
}
