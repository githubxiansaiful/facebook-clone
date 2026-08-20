import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Facebook - Connect and share with the people in your life",
  description: "A modern, full-featured Facebook-style social media platform built with Next.js App Router, React 19, TypeScript, Tailwind CSS, and Prisma.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#f0f2f5] dark:bg-[#18191a] text-zinc-900 dark:text-zinc-100 antialiased selection:bg-[#1877F2] selection:text-white">
        {children}
      </body>
    </html>
  );
}
