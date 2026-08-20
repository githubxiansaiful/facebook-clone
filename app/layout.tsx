import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript } from "../components/layout/ThemeScript";

const svgDataUri = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36' width='36' height='36'%3E%3Cpath fill='%231877F2' d='M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z'/%3E%3Cpath fill='%23FFFFFF' d='M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z'/%3E%3C/svg%3E`;

export const metadata: Metadata = {
  title: "Facebook - Connect and share with the people in your life",
  description: "A modern, full-featured Facebook-style social media platform built with Next.js App Router, React 19, TypeScript, Tailwind CSS, and Prisma.",
  icons: {
    icon: [
      { url: svgDataUri, type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: [svgDataUri],
    apple: [svgDataUri],
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
        <link rel="icon" type="image/svg+xml" href={svgDataUri} />
      </head>
      <body className="min-h-screen bg-[#f0f2f5] dark:bg-[#18191a] text-zinc-900 dark:text-zinc-100 antialiased selection:bg-[#1877F2] selection:text-white">
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
