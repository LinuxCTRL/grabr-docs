# grabr documentation

This is the official documentation website for **[grabr](https://www.npmjs.com/package/@linuxctrl/grabr)**, a modern, elegant file downloader with parallel chunking, resumable transfers, and an interactive terminal dashboard built for Node.js and Bun.

🔗 **NPM Package**: [@linuxctrl/grabr](https://www.npmjs.com/package/@linuxctrl/grabr)  
🔗 **GitHub Repository**: [LinuxCTRL/grabr](https://github.com/LinuxCTRL/grabr)  

## Overview
`grabr` splits massive files into chunks and downloads them simultaneously for maximum speed, providing a real-time terminal UI with speeds, ETAs, and progress bars. You can use it as a standalone CLI tool or import it programmatically into your own Node.js/Bun applications.

```bash
# Install grabr globally
npm install -g @linuxctrl/grabr

# Download a file at warp speed
grabr add https://speed.hetzner.de/10GB.bin
```

## Running the Documentation Locally

This documentation website is built using [Next.js](https://nextjs.org/) App Router, [Tailwind CSS](https://tailwindcss.com/), `shiki` for premium syntax highlighting, and `framer-motion` for smooth animations.

First, install dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the site.
