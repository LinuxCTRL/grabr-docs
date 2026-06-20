import { DocSidebar } from "@/components/doc-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background selection:bg-amber-500/30">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-amber-500/10 via-transparent to-transparent -z-10 blur-3xl opacity-50 pointer-events-none" />

      <div className="flex flex-1 container mx-auto px-6">
        <DocSidebar />
        <main className="flex-1 py-8 md:py-12 md:pl-16 min-w-0">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
