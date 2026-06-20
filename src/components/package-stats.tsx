"use client";

import { useEffect, useState } from "react";
import { Download, Star, GitFork } from "lucide-react";

interface Stats {
  downloads: number | null;
  stars: number | null;
  forks: number | null;
}

export function PackageStats() {
  const [stats, setStats] = useState<Stats>({
    downloads: null,
    stars: null,
    forks: null,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [downloadRes, repoRes] = await Promise.all([
          fetch("https://api.npmjs.org/downloads/point/last-week/@linuxctrl/grabr"),
          fetch("https://api.github.com/repos/LinuxCTRL/grabr"),
        ]);

        const downloadData = await downloadRes.json();
        const repoData = await repoRes.json();

        setStats({
          downloads: downloadData.downloads ?? null,
          stars: repoData.stargazers_count ?? null,
          forks: repoData.forks_count ?? null,
        });
      } catch {
        // silently fail — stats are non-critical
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
      {stats.downloads !== null && (
        <div className="flex items-center gap-1" title="Weekly npm downloads">
          <Download className="size-3" />
          <span>{formatNum(stats.downloads)}</span>
        </div>
      )}
      {stats.stars !== null && (
        <div className="flex items-center gap-1" title="GitHub stars">
          <Star className="size-3" />
          <span>{formatNum(stats.stars)}</span>
        </div>
      )}
      {stats.forks !== null && (
        <div className="flex items-center gap-1" title="GitHub forks">
          <GitFork className="size-3" />
          <span>{formatNum(stats.forks)}</span>
        </div>
      )}
    </div>
  );
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k";
  return String(n);
}
