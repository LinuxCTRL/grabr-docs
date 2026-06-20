import { CodeBlock } from "@/components/code-block";

export default function TanStackTutorialPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium mb-6 border border-amber-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        Full Integration Guide
      </div>
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-extrabold prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50 prose-pre:shadow-sm prose-pre:rounded-xl prose-a:text-amber-500 hover:prose-a:text-amber-600 transition-colors prose-strong:text-amber-600 dark:prose-strong:text-amber-400">
        <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Using grabr with TanStack Start</h1>

        <p>
          <a href="https://tanstack.com/start/latest" target="_blank" rel="noreferrer">TanStack Start</a> is a modern, full-stack React framework powered by TanStack Router. Since <strong>grabr</strong> requires Node.js to perform aggressive file I/O and parallel chunking, we can perfectly utilize TanStack Start's <code>createServerFn</code> to run grabr securely on the server while triggering it from the client.
        </p>

        <h2>1. Create a TanStack Start Project</h2>
        <p>Initialize a new TanStack Start app and install grabr:</p>
        <CodeBlock lang="bash" code={`npx create-tsrouter-app@latest my-grabr-app
cd my-grabr-app
npm install @linuxctrl/grabr`} />

        <h2>2. Build the Server Function</h2>
        <p>
          In TanStack Start, you bridge the frontend and backend using Server Functions. We will create a server function that instantiates the grabr engine and adds a download job.
        </p>
        <p>
          Create a file at <code>app/server/download.ts</code>:
        </p>
        <CodeBlock lang="typescript" code={`import { createServerFn } from '@tanstack/start'
import { Downloader } from '@linuxctrl/grabr'
import path from 'path'
import fs from 'fs'

export const triggerDownload = createServerFn({ method: 'POST' })
  .validator((data: { url: string; filename: string }) => data)
  .handler(async ({ data }) => {
    const { url, filename } = data

    // Ensure the downloads directory exists
    const outputDir = path.join(process.cwd(), 'downloads')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Initialize the grabr engine
    const downloader = new Downloader()
    await downloader.start()

    try {
      // Add the job and wait for it to queue
      const job = await downloader.addJob(url, {
        outputDir,
        filename,
        chunks: 8, // Split into 8 parallel streams
      })

      console.log(\`Started downloading \${job.filename} (ID: \${job.id})\`)
      
      return { success: true, jobId: job.id }
    } catch (error) {
      console.error("Download failed to start:", error)
      return { success: false, error: String(error) }
    }
  })
`} />

        <h2>3. Create the Frontend UI</h2>
        <p>
          Now, let's call this server function from our index route just like a normal asynchronous JavaScript function.
        </p>
        <p>
          Open <code>app/routes/index.tsx</code> and replace its contents:
        </p>
        <CodeBlock lang="tsx" code={`import { createFileRoute } from '@tanstack/react-router'
import { triggerDownload } from '../server/download'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [url, setUrl] = useState('https://speed.hetzner.de/100MB.bin')
  const [status, setStatus] = useState('')

  const handleDownload = async () => {
    setStatus('Starting grabr engine...')
    
    // Call the TanStack Server Function directly!
    const result = await triggerDownload({ data: { url, filename: 'test-file.bin' } })
    
    if (result.success) {
      setStatus('Downloading! Check your terminal and the ./downloads folder.')
    } else {
      setStatus(\`Error: \${result.error}\`)
    }
  }

  return (
    <main className="p-10 max-w-xl mx-auto space-y-4 font-sans">
      <h1 className="text-2xl font-bold">Grabr + TanStack Start Demo</h1>
      
      <input 
        type="text" 
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded text-black"
        placeholder="Enter file URL..."
      />
      
      <button 
        onClick={handleDownload}
        className="px-4 py-2 bg-amber-500 text-white font-bold rounded hover:bg-amber-600 transition-colors"
      >
        Download on Server
      </button>

      {status && <p className="text-sm font-medium mt-4">{status}</p>}
    </main>
  )
}
`} />

        <h2>4. Run the Application</h2>
        <p>Start the development server:</p>
        <CodeBlock lang="bash" code="npm run dev" />
        <p>
          Open your browser, click "Download on Server", and watch your terminal. The TanStack Start backend will instantly begin using grabr to parallel-chunk your download at maximum speed into the <code>./downloads</code> folder.
        </p>

      </article>
    </div>
  );
}
