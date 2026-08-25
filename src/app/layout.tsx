import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Great British Draw",
  description: "Premium competitions. Guaranteed winners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fdfbf7] text-[#1c1917] selection:bg-[#1c1917] selection:text-[#fdfbf7]">
        
        <header className="w-full border-b border-[#1c1917]/10 py-6 px-6 md:px-12 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-50">
          <Link href="/" className="text-2xl font-serif tracking-tight">
            The Great <span className="italic text-zinc-500">British</span> Draw.
          </Link>
          <nav className="hidden md:flex gap-8 text-xs font-medium tracking-[0.15em] uppercase text-zinc-500">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Competitions</Link>
            <Link href="/admin" className="hover:text-zinc-900 transition-colors">Admin</Link>
          </nav>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>
        
        <footer className="border-t border-[#1c1917]/10 py-16 text-center text-xs tracking-widest uppercase text-zinc-400 bg-white">
          <p>© {new Date().getFullYear()} The Great British Draw. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}