"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Book, Terminal, Code2, Cpu, FileCode2, type LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const nav: { title: string; icon: LucideIcon; items: { title: string; href: string }[] }[] = [
  {
    title: "Getting Started",
    icon: Book,
    items: [
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Usage",
    icon: Terminal,
    items: [
      { title: "CLI Reference", href: "/docs/cli" },
      { title: "Library API", href: "/docs/api" },
    ],
  },
  {
    title: "Guides",
    icon: FileCode2,
    items: [
      { title: "Next.js Integration", href: "/docs/tutorial" },
      { title: "Vite + React Integration", href: "/docs/tutorial-vite" },
      { title: "TanStack Start Integration", href: "/docs/tutorial-tanstack" },
    ],
  },
  {
    title: "Architecture",
    icon: Cpu,
    items: [
      { title: "Overview", href: "/docs/architecture" },
    ],
  },
];

export function DocSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 shrink-0 border-r border-border/50 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto bg-background/50 backdrop-blur-xl hidden md:block">
      <nav className="p-6 space-y-8">
        {nav.map((section) => (
          <div key={section.title} className="space-y-3">
            <div className="flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-widest text-muted-foreground/80 px-2">
              <div className="p-1.5 rounded-md bg-muted/50 border border-border/50 shadow-sm">
                <section.icon className="size-3.5 text-foreground" />
              </div>
              {section.title}
            </div>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-transparent"
                      )}
                    >
                      <span>{item.title}</span>
                      {isActive && (
                        <ChevronRight className="size-3.5 text-cyan-500 animate-in slide-in-from-left-2" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
