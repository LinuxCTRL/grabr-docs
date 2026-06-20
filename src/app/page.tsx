import Link from "next/link";
import { ArrowRight, Download, Terminal, BookOpen, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";

const features = [
  {
    icon: Download,
    title: "Chunked Parallel Downloads",
    desc: "Split files into chunks and download them simultaneously for maximum speed.",
  },
  {
    icon: Terminal,
    title: "Beautiful CLI Dashboard",
    desc: "Real-time progress bars, speeds, ETAs — all in an interactive terminal UI.",
  },
  {
    icon: BookOpen,
    title: "Library + CLI",
    desc: "Use as a CLI tool or import programmatically in React, Next.js, and Node.js.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Download className="size-5 text-amber-500" />
            grabr
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/docs/installation"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <Link
              href="https://github.com/LinuxCTRL/grabr"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <GitBranch className="size-4" />
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 md:py-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-6">
            <div className="rounded-full border px-4 py-1.5 text-xs font-medium text-muted-foreground bg-muted/50">
              CLI &middot; Library &middot; Open Source
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Download files at{" "}
              <span className="text-amber-500">warp speed</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              grabr is a modern file downloader with parallel chunking, resumable
              transfers, and a beautiful terminal dashboard. Works with Node.js
              and Bun.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Button asChild size="lg">
                <Link href="/docs/installation">
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://github.com/LinuxCTRL/grabr">
                  <GitBranch className="mr-2 size-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f) => (
              <Card key={f.title}>
                <CardHeader>
                  <f.icon className="size-8 text-amber-500 mb-2" />
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {f.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t">
          <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Quick Install</h2>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Terminal className="size-4" />
                <span>npm install -g grabr</span>
              </div>
              <div className="text-muted-foreground"># or</div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Terminal className="size-4" />
                <span>bun install -g grabr</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Then run <code className="text-amber-500">grabr --help</code> to get started.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>grabr &mdash; MIT License</span>
          <Link
            href="https://github.com/LinuxCTRL/grabr"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
        </div>
      </footer>
    </div>
  );
}
