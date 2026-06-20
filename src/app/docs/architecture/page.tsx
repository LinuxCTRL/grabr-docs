import { CodeBlock } from "@/components/code-block";

export default function ArchitecturePage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        Architecture Deep Dive
      </div>
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-extrabold prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50 prose-pre:shadow-sm prose-pre:rounded-xl prose-a:text-cyan-500 hover:prose-a:text-cyan-600 transition-colors prose-strong:text-cyan-600 dark:prose-strong:text-cyan-400">
        <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Architecture</h1>

      <h2>Overview</h2>
      <p>
        grabr is built with a modular architecture. The core download engine is
        UI-agnostic — it emits events consumed by the CLI dashboard, WebSocket
        server, or any programmatic consumer.
      </p>

      <CodeBlock lang="text" code={`URL → chunker → [chunk workers] → merger → final file
                      ↓
               EventEmitter
                      ↓
        CLI Dashboard  |  WebSocket → Browser UI`} />

      <h2>Project Structure</h2>
      <CodeBlock lang="text" code={`src/
├── index.ts           # Public library entry point
├── core/              # Download engine (UI-agnostic)
│   ├── downloader.ts  #   Orchestrator (EventEmitter)
│   ├── chunker.ts     #   HEAD request → split into ranges
│   ├── worker.ts      #   Single chunk fetch
│   ├── merger.ts      #   Assembles chunks into final file
│   ├── resume.ts      #   Resume state files
│   ├── config.ts      #   ~/.grabr/config.json
│   └── types.ts       #   Shared types
├── store/
│   ├── db.ts          #   sql.js SQLite setup
│   └── jobs.ts        #   CRUD for download jobs
├── cli/               # Terminal UI (Ink + React)
│   ├── index.tsx      #   CLI entry: arg parsing + routing
│   ├── commands/      #   add, list, pause, resume, remove, clear, ui, daemon
│   └── ui/            #   Ink components (Dashboard, JobRow, ProgressBar)
├── server/            # HTTP server (Hono)
│   └── index.ts       #   REST API + WebSocket + static file serving
└── web/               # Web UI source (vanilla TypeScript)
    ├── main.ts        #   WebSocket client + render loop
    ├── components/    #   JobCard, ProgressRing, Topbar
    └── styles/        #   CSS custom properties`} />

      <h2>Core Engine</h2>

      <h3>Chunked Download Flow</h3>
      <ol>
        <li>
          <strong>Metadata:</strong> A HEAD request fetches{" "}
          <code>Content-Length</code> and <code>Accept-Ranges</code>. If ranges
          are supported, the file is split into N chunks.
        </li>
        <li>
          <strong>Parallel Workers:</strong> Each chunk is downloaded
          independently via <code>fetch</code> with a <code>Range</code> header.
        </li>
        <li>
          <strong>Progress:</strong> Bytes flow through an EMA-based speed
          calculator (α=0.2 smoothing).
        </li>
        <li>
          <strong>Merge:</strong> Completed chunks are assembled in order via
          streaming pipeline.
        </li>
        <li>
          <strong>Retry:</strong> Failed chunks retry up to 3 times with
          exponential backoff (2s, 4s, 8s).
        </li>
      </ol>

      <h3>Resume</h3>
      <p>
        Each job writes a resume file (<code>.grabr/&lt;jobId&gt;.json</code>)
        tracking per-chunk progress. If interrupted, chunks that completed
        before the interruption are skipped.
      </p>

      <h3>Filename Collision</h3>
      <p>
        If a file already exists at the destination, grabr appends a counter:
        <code>file(1).zip</code>, <code>file(2).zip</code>, etc.
      </p>

      <h2>Storage</h2>
      <p>
        Uses <strong>sql.js</strong> — SQLite compiled to WebAssembly. No native
        compilation required, works on both Node.js and Bun. The database is
        persisted to <code>.grabr/grabr.db</code> and flushed to disk after
        every write operation.
      </p>

      <h2>CLI Dashboard</h2>
      <p>
        Built with <strong>Ink</strong> (React for terminals). The dashboard
        connects to the local daemon via WebSocket for live updates, or runs the
        downloader in-process for standalone mode.
      </p>

      <h2>Server + Web UI</h2>
      <p>
        The daemon uses <strong>Hono</strong> for HTTP routing, Bun's native
        WebSocket for real-time events, and serves a vanilla TypeScript web
        dashboard with SVG progress rings.
      </p>

      <h3>API Endpoints</h3>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Path</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GET</td>
            <td><code>/api/jobs</code></td>
            <td>List all jobs</td>
          </tr>
          <tr>
            <td>POST</td>
            <td><code>/api/jobs</code></td>
            <td>Add a new job</td>
          </tr>
          <tr>
            <td>GET</td>
            <td><code>/api/jobs/:id</code></td>
            <td>Get job details</td>
          </tr>
          <tr>
            <td>POST</td>
            <td><code>/api/jobs/:id/pause</code></td>
            <td>Pause a job</td>
          </tr>
          <tr>
            <td>POST</td>
            <td><code>/api/jobs/:id/resume</code></td>
            <td>Resume a job</td>
          </tr>
          <tr>
            <td>DELETE</td>
            <td><code>/api/jobs/:id</code></td>
            <td>Remove a job</td>
          </tr>
          <tr>
            <td>WS</td>
            <td><code>/ws</code></td>
            <td>Real-time progress stream</td>
          </tr>
        </tbody>
      </table>

      <h2>Tech Stack</h2>
      <table>
        <thead>
          <tr>
            <th>Package</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>sql.js</td>
            <td>SQLite via WebAssembly (no native deps)</td>
          </tr>
          <tr>
            <td>hono</td>
            <td>HTTP server + router + WebSocket</td>
          </tr>
          <tr>
            <td>ink</td>
            <td>React-based terminal UI</td>
          </tr>
          <tr>
            <td>nanoid</td>
            <td>Job ID generation</td>
          </tr>
          <tr>
            <td>mime-types</td>
            <td>File extension detection from Content-Type</td>
          </tr>
        </tbody>
      </table>
    </article>
    </div>
  );
}
