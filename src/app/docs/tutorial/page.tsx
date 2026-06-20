import { CodeBlock } from "@/components/code-block";

export default function TutorialPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        Full Integration Guide
      </div>
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-extrabold prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50 prose-pre:shadow-sm prose-pre:rounded-xl prose-a:text-cyan-500 hover:prose-a:text-cyan-600 transition-colors prose-strong:text-cyan-600 dark:prose-strong:text-cyan-400">
        <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Using grabr with Next.js</h1>

        <p>
          Because <strong>grabr</strong> writes directly to the filesystem and performs high-speed parallel network requests, it is designed to run in server environments (Node.js or Bun). You cannot run grabr directly inside a browser component.
        </p>
        <p>
          In this tutorial, we will integrate grabr into a <strong>Next.js App Router</strong> project using a Server Action to trigger a backend download when a user clicks a button.
        </p>

        <h2>1. Create a Next.js Project</h2>
        <p>Start by initializing a fresh Next.js app and installing grabr.</p>
        <CodeBlock lang="bash" code={`npx create-next-app@latest my-grabr-app
cd my-grabr-app
npm install @linuxctrl/grabr`} />

        <h2>2. Build the Server Action</h2>
        <p>
          We need a secure backend environment to run grabr. We'll create a Next.js Server Action that instantiates the downloader, adds a job, and starts the transfer.
        </p>
        <p>
          Create a file at <code>src/app/actions.ts</code>:
        </p>
        <CodeBlock lang="typescript" code={`"use server";

import { Downloader } from "@linuxctrl/grabr";
import path from "path";
import fs from "fs";

export async function triggerDownload(url: string, filename: string) {
  // Ensure the downloads directory exists
  const outputDir = path.join(process.cwd(), "downloads");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Initialize grabr
  const downloader = new Downloader();
  await downloader.start();

  try {
    // Add the job and wait for it to queue
    const job = await downloader.addJob(url, {
      outputDir,
      filename,
      chunks: 8, // Split into 8 parallel streams
    });

    // You can optionally listen to events here if needed,
    // but typically you just let the daemon run.
    console.log(\`Started downloading \${job.filename} (ID: \${job.id})\`);

    return { success: true, jobId: job.id };
  } catch (error) {
    console.error("Download failed to start:", error);
    return { success: false, error: String(error) };
  }
}`} />

        <h2>3. Create the Frontend UI</h2>
        <p>
          Now we'll build a simple client component where the user can enter a URL and click a button to tell the server to fetch it using grabr.
        </p>
        <p>
          Open <code>src/app/page.tsx</code> and replace its contents:
        </p>
        <CodeBlock lang="tsx" code={`"use client";

import { useState } from "react";
import { triggerDownload } from "./actions";

export default function HomePage() {
  const [url, setUrl] = useState("https://speed.hetzner.de/100MB.bin");
  const [status, setStatus] = useState("");

  const handleDownload = async () => {
    setStatus("Starting grabr engine...");
    
    // Call the server action
    const result = await triggerDownload(url, "test-file.bin");
    
    if (result.success) {
      setStatus(\`Downloading! Check your terminal and the ./downloads folder.\`);
    } else {
      setStatus(\`Error: \${result.error}\`);
    }
  };

  return (
    <main className="p-10 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Grabr Next.js Demo</h1>
      
      <input 
        type="text" 
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded text-black"
        placeholder="Enter file URL..."
      />
      
      <button 
        onClick={handleDownload}
        className="px-4 py-2 bg-cyan-500 text-white font-bold rounded"
      >
        Download on Server
      </button>

      {status && <p className="text-sm font-medium mt-4">{status}</p>}
    </main>
  );
}`} />

        <h2>4. Run the Application</h2>
        <p>Start your development server:</p>
        <CodeBlock lang="bash" code="npm run dev" />
        <p>
          Open your browser, click "Download on Server", and watch your server terminal! grabr will instantly parallel-chunk the file directly to your Next.js server's <code>./downloads</code> folder at maximum speed.
        </p>

        <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-lg mt-8">
          <h3 className="text-cyan-500 font-bold m-0 mb-2">Pro Tip: Progress Streaming</h3>
          <p className="text-sm m-0 text-muted-foreground">
            In a full production app, you can use grabr's built-in <code>EventEmitter</code> or WebSocket capabilities to stream live download progress (speeds and ETAs) from the Node.js server back to the React frontend using Server-Sent Events (SSE) or Socket.io!
          </p>
        </div>

      </article>
    </div>
  );
}
