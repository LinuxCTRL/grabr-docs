import { CodeBlock } from "@/components/code-block";

export default function ViteTutorialPage() {
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
        <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Using grabr with Vite + React</h1>

        <p>
          Because <strong>grabr</strong> performs aggressive parallel chunking and raw filesystem writes, it requires a Node.js or Bun backend environment. It cannot run directly inside a Vite React Single Page Application (SPA).
        </p>
        <p>
          In this tutorial, we will build a full-stack application. We will create an <strong>Express.js API backend</strong> to run grabr, and a <strong>Vite React frontend</strong> that tells the backend what files to download.
        </p>

        <h2>1. Project Setup</h2>
        <p>First, create a folder for your project and initialize both the frontend and backend.</p>
        <CodeBlock lang="bash" code={`mkdir my-grabr-app
cd my-grabr-app

# Initialize Vite frontend
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
cd ..

# Initialize Express backend
mkdir backend
cd backend
npm init -y
npm install express cors @linuxctrl/grabr
npm install -D typescript @types/express @types/cors ts-node
`} />

        <h2>2. Build the Express Backend</h2>
        <p>
          We'll create an API endpoint <code>/api/download</code> that accepts a URL and uses grabr to download it.
        </p>
        <p>
          Create <code>backend/server.ts</code>:
        </p>
        <CodeBlock lang="typescript" code={`import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { Downloader } from "@linuxctrl/grabr";

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the global grabr engine
const downloader = new Downloader();
downloader.start();

app.post("/api/download", async (req, res) => {
  const { url, filename } = req.body;

  // Ensure downloads directory exists
  const outputDir = path.join(process.cwd(), "downloads");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Add job to the grabr daemon
    const job = await downloader.addJob(url, {
      outputDir,
      filename,
      chunks: 8 // Download using 8 parallel connections
    });

    console.log(\`Job added: \${job.filename}\`);
    res.json({ success: true, jobId: job.id });
  } catch (error) {
    console.error("Error starting grabr:", error);
    res.status(500).json({ success: false, error: String(error) });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(\`Backend running on http://localhost:\${PORT}\`);
});
`} />

        <h2>3. Build the Vite React Frontend</h2>
        <p>
          Now let's build the React UI to send requests to our Express server.
        </p>
        <p>
          Open <code>frontend/src/App.tsx</code> and replace it with:
        </p>
        <CodeBlock lang="tsx" code={`import { useState } from 'react'

function App() {
  const [url, setUrl] = useState("https://speed.hetzner.de/100MB.bin");
  const [status, setStatus] = useState("");

  const handleDownload = async () => {
    setStatus("Connecting to backend...");
    
    try {
      const response = await fetch("http://localhost:3001/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, filename: "test-file.bin" })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus(\`Downloading! Check the backend terminal and downloads folder.\`);
      } else {
        setStatus(\`Error: \${data.error}\`);
      }
    } catch (err) {
      setStatus("Failed to connect to backend");
    }
  };

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Grabr Vite Demo</h1>
      
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "300px", padding: "8px" }}
        />
        
        <button 
          onClick={handleDownload}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Download via Backend
        </button>
      </div>

      {status && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{status}</p>}
    </main>
  )
}

export default App
`} />

        <h2>4. Run the Full Stack</h2>
        <p>You need to start both servers. Open two terminal windows.</p>
        
        <p><strong>Terminal 1 (Backend):</strong></p>
        <CodeBlock lang="bash" code={`cd backend
npx ts-node server.ts`} />

        <p><strong>Terminal 2 (Frontend):</strong></p>
        <CodeBlock lang="bash" code={`cd frontend
npm run dev`} />

        <p>
          Open the Vite frontend URL in your browser, click <strong>Download via Backend</strong>, and watch your Express terminal! grabr will instantly parallel-chunk the file directly to your backend's <code>./downloads</code> folder at maximum speed.
        </p>

        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg mt-8">
          <h3 className="text-amber-500 font-bold m-0 mb-2">Advanced: Live Progress via WebSocket</h3>
          <p className="text-sm m-0 text-muted-foreground">
            Want to show real-time progress bars in React? Use a WebSocket library like <code>socket.io</code> to listen to grabr's <code>job:progress</code> events in Express, and emit them to your Vite frontend!
          </p>
        </div>

      </article>
    </div>
  );
}
