import Link from "next/link";
import { ArrowRight, Download, Terminal, BookOpen, GitBranch, Cpu, FastForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/fade-in";
import { CodeBlock } from "@/components/code-block";

const features = [
  {
    icon: FastForward,
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
    <div className="flex flex-col flex-1 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute top-0 left-0 -z-10 h-[800px] w-full bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-6 relative z-10">
            <FadeIn delay={0.1} yOffset={10}>
              <div className="rounded-full border border-cyan-500/30 px-4 py-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 backdrop-blur-sm">
                CLI &middot; Node.js &middot; Open Source
              </div>
            </FadeIn>
            <FadeIn delay={0.2} yOffset={20}>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                Download files at{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-sm">warp speed</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3} yOffset={20}>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                The modern file downloader with aggressive parallel chunking, resumable
                transfers, and a gorgeous interactive terminal dashboard. 
              </p>
            </FadeIn>
            <FadeIn delay={0.4} yOffset={20}>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 shadow-lg shadow-cyan-500/25 px-8 rounded-full h-12 text-md w-full sm:w-auto border-0">
                  <Link href="/docs/installation">
                    Get Started
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 rounded-full h-12 text-md w-full sm:w-auto bg-background/50 backdrop-blur-sm border-border/50 hover:bg-muted/80">
                  <Link href="https://github.com/LinuxCTRL/grabr">
                    <GitBranch className="mr-2 size-4" />
                    GitHub
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="container mx-auto px-4 pb-24">
          <FadeIn delay={0.5} yOffset={30}>
            <div className="max-w-4xl mx-auto rounded-2xl border border-border/50 bg-background/40 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/10 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10" />
              <div className="flex items-center px-4 py-3 border-b border-border/50 bg-muted/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-cyan-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-xs font-mono text-muted-foreground font-medium">grabr dashboard</div>
              </div>
              <div className="p-4 md:p-6 overflow-x-auto relative z-10">
                <CodeBlock className="my-0 shadow-none border-none [&>pre]:!bg-transparent" lang="text" code={`+- grabr ------------------------------------------------+
|                                                        |
|  ubuntu-24.04.iso                     84%  ↓ 12 MB/s   |
|  [====================----]  ETA 0:42                  |
|                                                        |
|  node-v22-linux.tar.gz                100%  ✓          |
|  [========================]  4.2 GB                    |
|                                                        |
|  q quit  p pause  r resume  ↑↓ navigate                |
+--------------------------------------------------------+`} />
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 pb-24">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Built from the ground up for maximum performance and a flawless developer experience.</p>
            </FadeIn>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={0.1 * i} yOffset={30} className="h-full">
                <Card className="h-full border-border/50 bg-background/50 backdrop-blur supports-backdrop-filter:bg-background/20 hover:border-cyan-500/30 transition-colors group">
                  <CardHeader>
                    <div className="p-3 bg-cyan-500/10 w-fit rounded-lg mb-4 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                      <f.icon className="size-6 text-cyan-500" />
                    </div>
                    <CardTitle className="text-xl">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground leading-relaxed">
                    {f.desc}
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Code Example Section */}
        <section className="border-t border-border/40 bg-muted/20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-cyan-500/10 blur-[100px] -z-10 rounded-full" />
          <div className="container mx-auto px-4 py-24 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <FadeIn>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Incredibly Simple API</h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Don't want to use the CLI? Import grabr directly into your Node.js or Bun projects and build your own download tools in minutes. Full TypeScript support included.
                  </p>
                  <Button asChild variant="outline" className="rounded-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-muted/80">
                    <Link href="/docs/api">View Library API <ArrowRight className="ml-2 size-4" /></Link>
                  </Button>
                </FadeIn>
              </div>
              <FadeIn delay={0.2}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                  <div className="relative">
                    <CodeBlock lang="typescript" className="my-0" code={`import { Downloader } from "@linuxctrl/grabr";

const downloader = new Downloader();

await downloader.start();

const job = await downloader.addJob(
  "https://speed.hetzner.de/10GB.bin",
  {
    chunks: 16,
    outputDir: "./downloads"
  }
);

downloader.on("job:progress", (data) => {
  console.log(\`Downloading: \${data.speed} bytes/sec\`);
});`} />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Quick Install Section */}
        <section className="border-t border-border/40">
          <FadeIn 
            yOffset={40}
            className="container mx-auto px-4 py-24 max-w-3xl"
          >
            <div className="flex flex-col items-center">
              <div className="p-4 bg-cyan-500/10 rounded-full mb-6">
                <Cpu className="size-8 text-cyan-500" />
              </div>
              <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">Ready to start downloading?</h2>
              <div className="bg-muted/50 border border-border/50 backdrop-blur-sm rounded-xl p-6 font-mono text-sm w-full shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="size-24" /></div>
                <div className="flex items-center gap-3 text-muted-foreground mb-4 relative z-10">
                  <Terminal className="size-5 text-cyan-500" />
                  <span className="text-foreground text-base">npm install -g @linuxctrl/grabr</span>
                </div>
                <div className="text-muted-foreground/50 mb-4 pl-8 relative z-10"># or</div>
                <div className="flex items-center gap-3 text-muted-foreground relative z-10">
                  <Terminal className="size-5 text-cyan-500" />
                  <span className="text-foreground text-base">bun install -g @linuxctrl/grabr</span>
                </div>
              </div>
              <p className="text-center text-muted-foreground mt-6 text-lg">
                Then run <code className="text-cyan-500 font-mono bg-cyan-500/10 px-2 py-1 rounded">grabr --help</code> to launch.
              </p>
            </div>
          </FadeIn>
        </section>
      </main>
    </div>
  );
}
