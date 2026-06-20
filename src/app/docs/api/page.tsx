import { CodeBlock } from "@/components/code-block";

export default function ApiPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        Library API
      </div>
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-extrabold prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50 prose-pre:shadow-sm prose-pre:rounded-xl prose-a:text-cyan-500 hover:prose-a:text-cyan-600 transition-colors prose-strong:text-cyan-600 dark:prose-strong:text-cyan-400">
        <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Library API</h1>

      <p>
        grabr can be imported programmatically into any Node.js or Bun project.
      </p>

      <h2>Installation</h2>
      <CodeBlock lang="bash" code="npm install @linuxctrl/grabr" />

      <h2>Import</h2>
      <CodeBlock lang="typescript" code={`import { Downloader, SpeedMeter, loadConfig, saveConfig } from "@linuxctrl/grabr";
import type { DownloadJob, DownloadOptions, JobStatus, ChunkInfo, GrabrConfig } from "@linuxctrl/grabr";`} />

      <h2>Downloader</h2>
      <p>
        The main class that orchestrates parallel chunked downloads. Extends{" "}
        <code>EventEmitter</code>.
      </p>

      <h3>Constructor</h3>
      <CodeBlock lang="typescript" code={`const downloader = new Downloader();
await downloader.start();`} />

      <h3>Methods</h3>

      <h4>
        <code>start(): Promise&lt;void&gt;</code>
      </h4>
      <p>
        Initializes the downloader, loads interrupted jobs from the database,
        and starts the stats updater.
      </p>

      <h4>
        <code>stop(): void</code>
      </h4>
      <p>Stops all active downloads and clears the interval timer.</p>

      <h4>
        <code>addJob(url: string, options?: DownloadOptions): Promise&lt;DownloadJob&gt;</code>
      </h4>
      <p>Add a download job to the queue. Returns the created job.</p>
      <CodeBlock lang="typescript" code={`const job = await downloader.addJob("https://example.com/file.zip", {
  outputDir: "./downloads",
  chunks: 4,
  filename: "myfile.zip",
});`} />

      <h4>
        <code>pauseJob(jobId: string): Promise&lt;void&gt;</code>
      </h4>
      <p>Pause a specific download job.</p>

      <h4>
        <code>resumeJob(jobId: string): Promise&lt;void&gt;</code>
      </h4>
      <p>Resume a paused or failed download job.</p>

      <h4>
        <code>removeJob(jobId: string): Promise&lt;void&gt;</code>
      </h4>
      <p>Remove a job from the queue and delete its resume state.</p>

      <h4>
        <code>pauseAll(): Promise&lt;void&gt;</code>
      </h4>
      <p>Pause all active and queued downloads.</p>

      <h4>
        <code>resumeAll(): Promise&lt;void&gt;</code>
      </h4>
      <p>Resume all paused and failed downloads.</p>

      <h3>Events</h3>
      <CodeBlock lang="typescript" code={`downloader.on("job:added", (job: DownloadJob) => {
  console.log("New job:", job.id);
});

downloader.on("job:progress", (data: { jobId: string; downloadedBytes: number; speed: number; eta: number }) => {
  console.log(\`\${data.jobId}: \${data.downloadedBytes} bytes\`);
});

downloader.on("job:status", (data: { jobId: string; status: JobStatus; error?: string }) => {
  console.log(\`\${data.jobId}: \${data.status}\`);
});

downloader.on("job:removed", (jobId: string) => {
  console.log(\`Removed: \${jobId}\`);
});`} />

      <h2>Types</h2>

      <h3>DownloadJob</h3>
      <CodeBlock lang="typescript" code={`interface DownloadJob {
  id: string;
  url: string;
  filename: string;
  destination: string;
  totalBytes: number;
  downloadedBytes: number;
  chunks: ChunkInfo[];
  status: "queued" | "downloading" | "paused" | "completed" | "failed";
  speed: number;         // bytes/sec (EMA smoothed)
  eta: number;           // seconds remaining
  createdAt: number;
  updatedAt: number;
  error?: string;
}`} />

      <h3>ChunkInfo</h3>
      <CodeBlock lang="typescript" code={`interface ChunkInfo {
  index: number;
  start: number;
  end: number;
  downloaded: number;
  status: "pending" | "downloading" | "done" | "failed";
}`} />

      <h3>DownloadOptions</h3>
      <CodeBlock lang="typescript" code={`interface DownloadOptions {
  outputDir?: string;
  filename?: string;
  chunks?: number;
}`} />

      <h3>GrabrConfig</h3>
      <CodeBlock lang="typescript" code={`interface GrabrConfig {
  outputDir: string;
  maxConcurrent: number;
  defaultChunks: number;
  serverPort: number;
  theme: string;
}`} />

      <h2>Config</h2>
      <CodeBlock lang="typescript" code={`import { loadConfig, saveConfig } from "@linuxctrl/grabr";

const config = loadConfig();
console.log(config.outputDir); // ~/Downloads

saveConfig({ defaultChunks: 8 });`} />
      <p>
        Config is stored in <code>~/.grabr/config.json</code>.
      </p>

      <h2>SpeedMeter</h2>
      <p>
        Utility class for EMA-smoothed speed calculation.
      </p>
      <CodeBlock lang="typescript" code={`const meter = new SpeedMeter();
// call update(totalBytes) periodically
const speed = meter.update(1024); // bytes/sec`} />
    </article>
    </div>
  );
}
