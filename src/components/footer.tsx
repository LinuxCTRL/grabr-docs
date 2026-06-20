import Link from "next/link";
import { Download, GitBranch, Hash } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
              <div className="bg-cyan-500/10 p-1.5 rounded-lg border border-cyan-500/20">
                <Download className="size-5 text-cyan-500" />
              </div>
              <span>grabr</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              The modern, blazing-fast file downloader. Designed for the CLI, Node.js, and Bun. Parallel chunking, smart resuming, and beautiful dashboards.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="https://github.com/LinuxCTRL/grabr" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-cyan-500 transition-colors">
                <GitBranch className="size-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-cyan-500 transition-colors">
                <Hash className="size-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/docs/installation" className="hover:text-cyan-500 transition-colors">Installation</Link></li>
              <li><Link href="/docs/cli" className="hover:text-cyan-500 transition-colors">CLI Reference</Link></li>
              <li><Link href="/docs/api" className="hover:text-cyan-500 transition-colors">Library API</Link></li>
              <li><Link href="/docs/tutorial" className="hover:text-cyan-500 transition-colors">Next.js Tutorial</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Ecosystem</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="https://github.com/LinuxCTRL/grabr" className="hover:text-cyan-500 transition-colors">GitHub Repository</Link></li>
              <li><Link href="https://npmjs.com/package/@linuxctrl/grabr" className="hover:text-cyan-500 transition-colors">NPM Package</Link></li>
              <li><Link href="/docs/architecture" className="hover:text-cyan-500 transition-colors">Architecture</Link></li>
              <li><Link href="#" className="hover:text-cyan-500 transition-colors">Discussions</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} LinuxCTRL. MIT License.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
