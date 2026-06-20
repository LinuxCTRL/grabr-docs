import { Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";

export default function InstallationPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium mb-6 border border-amber-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        Installation
      </div>
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-extrabold prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50 prose-pre:shadow-sm prose-pre:rounded-xl prose-a:text-amber-500 hover:prose-a:text-amber-600 transition-colors prose-strong:text-amber-600 dark:prose-strong:text-amber-400">
        <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Installation</h1>

      <h2>Prerequisites</h2>
      <ul>
        <li><strong>Node.js</strong> 18+ or <strong>Bun</strong> 1.0+</li>
      </ul>

      <h2>Install as a CLI</h2>
      <CodeBlock lang="bash" code="npm install -g @linuxctrl/grabr" />
      <p>Or with Bun:</p>
      <CodeBlock lang="bash" code="bun install -g @linuxctrl/grabr" />
      <p>After installation, verify it works:</p>
      <CodeBlock lang="bash" code="npx @linuxctrl/grabr --help" />

      <h2>Install as a Library</h2>
      <CodeBlock lang="bash" code="npm install @linuxctrl/grabr" />
      <p>Then import it in your project:</p>
      <CodeBlock lang="typescript" code={`import { Downloader } from "@linuxctrl/grabr";

const downloader = new Downloader();
await downloader.start();`} />

      <h2>Build from Source</h2>
      <CodeBlock lang="bash" code={`git clone https://github.com/LinuxCTRL/grabr.git
cd grabr
bun install
bun run build`} />
      <p>This produces <code>dist/</code> with the CLI and library.</p>

      <h2>Running Locally (Development)</h2>
      <CodeBlock lang="bash" code={`# Run CLI directly from source
bun run cli --help

# Add a download
bun run src/cli/index.tsx add https://example.com/file.zip

# Start the web server + dashboard
bun run src/server/index.ts`} />
    </article>
    </div>
  );
}
