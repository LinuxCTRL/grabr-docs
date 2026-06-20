import { Terminal } from "lucide-react";
import { CodeBlock } from "@/components/code-block";

export default function CliPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium mb-6 border border-amber-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        CLI Reference
      </div>
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-extrabold prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50 prose-pre:shadow-sm prose-pre:rounded-xl prose-a:text-amber-500 hover:prose-a:text-amber-600 transition-colors prose-strong:text-amber-600 dark:prose-strong:text-amber-400">
        <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">CLI Reference</h1>

      <p>
        grabr provides a full-featured command-line interface. Run{" "}
        <code>grabr --help</code> to see all available commands.
      </p>

      <h2>Commands</h2>

      <h3>
        <code>grabr add &lt;url&gt;</code>
      </h3>
      <p>Add a new download job.</p>
      <CodeBlock lang="bash" code={`grabr add https://example.com/file.zip
grabr add https://example.com/file.zip --output ./videos
grabr add https://example.com/file.zip --chunks 8
grabr add https://example.com/file.zip --name myfile.zip`} />

      <h4>Options</h4>
      <table>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Description</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>--output, -o</code></td>
            <td>Output directory</td>
            <td><code>./downloads</code></td>
          </tr>
          <tr>
            <td><code>--chunks, -c</code></td>
            <td>Number of parallel chunk workers</td>
            <td><code>4</code></td>
          </tr>
          <tr>
            <td><code>--name, -n</code></td>
            <td>Custom output filename</td>
            <td>Auto-detected from URL</td>
          </tr>
        </tbody>
      </table>

      <h3>
        <code>grabr list</code>
      </h3>
      <p>List all download jobs and their statuses.</p>
      <CodeBlock lang="bash" code={`$ grabr list
 ID          FILENAME        STATUS          PROGRESS      SPEED         ETA
 ——————————— ——————————————— ——————————————— ————————————— ————————————— ————————————
 abc123defg  ubuntu-24.04…   DOWNLOADING     42% (512MB…   12 MB/s       0:42`} />

      <h3>
        <code>grabr pause &lt;id|all&gt;</code>
      </h3>
      <p>Pause active downloads. Use <code>all</code> to pause everything.</p>
      <CodeBlock lang="bash" code={`grabr pause abc123defg
grabr pause all`} />

      <h3>
        <code>grabr resume &lt;id|all&gt;</code>
      </h3>
      <p>Resume paused or failed downloads.</p>

      <h3>
        <code>grabr remove &lt;id&gt;</code>
      </h3>
      <p>Remove a download job from the queue and disk state.</p>

      <h3>
        <code>grabr clear --completed</code>
      </h3>
      <p>Clear all completed jobs from the database.</p>

      <h3>
        <code>grabr ui</code>
      </h3>
      <p>Open the Web UI dashboard in your default browser. Starts the daemon if not running.</p>

      <h3>
        <code>grabr daemon [start|stop|status]</code>
      </h3>
      <p>Manage the background server daemon.</p>
      <CodeBlock lang="bash" code={`grabr daemon start    # Start background server
grabr daemon stop     # Stop background server
grabr daemon status   # Check if daemon is running`} />

      <h2>Interactive Dashboard</h2>
      <p>
        Run <code>grabr</code> without any arguments to open the full-screen
        terminal dashboard with live progress tracking and keyboard shortcuts.
      </p>

      <CodeBlock lang="text" code={`+- grabr ------------------------------------------------+
|                                                        |
|  ubuntu-24.04.iso                     84%  ↓ 12 MB/s   |
|  [====================----]  ETA 0:42                  |
|                                                        |
|  node-v22-linux.tar.gz                100%  ✓          |
|  [========================]  4.2 GB                    |
|                                                        |
|  q quit  p pause  r resume  ↑↓ navigate                |
+--------------------------------------------------------+`} />

      <h3>Keyboard Shortcuts</h3>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>q</code></td>
            <td>Quit dashboard</td>
          </tr>
          <tr>
            <td><code>p</code></td>
            <td>Pause selected job</td>
          </tr>
          <tr>
            <td><code>r</code></td>
            <td>Resume selected job</td>
          </tr>
          <tr>
            <td><code>x</code></td>
            <td>Remove selected job</td>
          </tr>
          <tr>
            <td><code>↑↓</code></td>
            <td>Navigate between jobs</td>
          </tr>
        </tbody>
      </table>
    </article>
    </div>
  );
}
