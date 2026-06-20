import Link from "next/link";
import { Download, GitBranch } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
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

      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/60 backdrop-blur-xl supports-backdrop-filter:bg-background/40">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg group">
            <div className="bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
              <Download className="size-5 text-amber-500" />
            </div>
            <span>grabr</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <div className="h-4 w-px bg-border/50" />
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/LinuxCTRL/grabr"
                className="text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/80 p-2 rounded-md"
              >
                <GitBranch className="size-4" />
              </Link>
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>

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
