"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, GitBranch, Terminal } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { PackageStats } from "@/components/package-stats";

export function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-backdrop-filter:bg-background/40"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg group">
            <div className="bg-gradient-to-tr from-amber-500 to-amber-300 p-1.5 rounded-lg text-white shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 transform group-hover:scale-105">
              <Download className="size-5" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 tracking-tight text-xl">grabr</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium ml-4">
            <Link href="/docs/installation" className="text-muted-foreground hover:text-foreground hover:bg-muted/80 px-3 py-1.5 rounded-md transition-all">Docs</Link>
            <Link href="/docs/cli" className="text-muted-foreground hover:text-foreground hover:bg-muted/80 px-3 py-1.5 rounded-md transition-all">CLI</Link>
            <Link href="/docs/api" className="text-muted-foreground hover:text-foreground hover:bg-muted/80 px-3 py-1.5 rounded-md transition-all">API</Link>
            <Link href="/docs/tutorial" className="text-muted-foreground hover:text-foreground hover:bg-muted/80 px-3 py-1.5 rounded-md transition-all">Tutorial</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <PackageStats />
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="https://github.com/LinuxCTRL/grabr"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/80 p-2 rounded-md"
            >
              <GitBranch className="size-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
          <div className="h-4 w-px bg-border/50 hidden sm:block" />
          <ModeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20 rounded-full px-4">
            <Link href="/docs/installation">Get Started</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
