import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GB Draw | Win Big for £1!",
  description: "The UK's most fun and affordable prize draws.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-sky-50 text-slate-900 selection:bg-yellow-400 selection:text-slate-900">
        
        <header className="w-full border-b-4 border-slate-900 py-4 px-6 md:px-12 flex justify-between items-center bg-white sticky top-0 z-50">
          <Link href="/" className="text-3xl font-heading font-bold text-sky-500 flex items-center gap-2 hover:scale-105 transition-transform">
            <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-xl border-4 border-slate-900 transform -rotate-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">GB</span>
            Draw
          </Link>
          <nav className="hidden md:flex gap-8 font-bold text-lg text-slate-600">
            <Link href="/" className="hover:text-sky-500 hover:-translate-y-1 transition-all">Draws</Link>
            <Link href="/admin" className="hover:text-sky-500 hover:-translate-y-1 transition-all">Admin</Link>
          </nav>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>
        
        <footer className="border-t-4 border-slate-900 py-12 text-center font-bold text-slate-500 bg-white">
          <p>© {new Date().getFullYear()} Great British Draw. Win massive prizes for just a quid!</p>
        </footer>
      </body>
    </html>
  );
}