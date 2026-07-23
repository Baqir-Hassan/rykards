import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Rykards \u2014 Independent Software Engineering Company",
  description:
    "Rykards partners with ambitious teams to design, build, and scale software products, AI systems, and cloud platforms. Senior engineering, clear thinking, and delivery built around outcomes.",
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon-48.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Rykards \u2014 Independent Software Engineering Company",
    description:
      "Rykards designs, builds, and scales software products, AI systems, and cloud platforms for ambitious teams.",
    type: "website",
    siteName: "Rykards",
  },
  twitter: {
    card: "summary",
    title: "Rykards \u2014 Independent Software Engineering Company",
    description: "Independent software engineering for ambitious teams.",
  },
};


// jlksjda;f
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}