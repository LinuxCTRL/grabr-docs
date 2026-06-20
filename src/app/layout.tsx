import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const Operator = localFont({
  src: "./../../public/OperatorMonoLig-Book.otf"
});


export const metadata: Metadata = {
  title: {
    default: "grabr — Modern File Downloader",
    template: "%s | grabr",
  },
  description:
    "A modern, elegant file downloader — CLI tool & library for Bun and Node.js. Chunked parallel downloads, progress tracking, resumable transfers.",
  openGraph: {
    title: "grabr — Modern File Downloader",
    description:
      "A modern, elegant file downloader — CLI tool & library for Bun and Node.js.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${Operator.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
