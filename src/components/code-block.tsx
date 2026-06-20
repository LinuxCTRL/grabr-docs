import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  lang?: string;
  className?: string;
}

export async function CodeBlock({ code, lang = "bash", className }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: "vitesse-dark",
  });

  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-xl border border-border/50 shadow-sm text-sm",
        "[&>pre]:!m-0 [&>pre]:!p-4 [&>pre]:!bg-[#121212] [&>pre]:!font-mono overflow-x-auto",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
