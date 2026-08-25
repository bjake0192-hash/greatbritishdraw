import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ShoppingCart, Search, Menu, MapPin } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Great British Draw",
  description: "Guaranteed winners every week.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#eaeded] text-[#0f1111]">
        
        {/* Amazon-style Top Nav */}
        <header className="bg-[#131921] text-white">
          <div className="flex items-center justify-between px-4 py-2 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 font-bold text-xl border border-transparent hover:border-white p-1 rounded-sm">
              <span className="text-white">GB<span className="text-[#f3a847]">Draw</span></span>
            </Link>

            {/* Deliver to */}
            <div className="hidden md:flex items-center gap-1 text-sm border border-transparent hover:border-white p-1 rounded-sm cursor-pointer">
              <MapPin size={18} className="text-gray-300 mt-2" />
              <div className="leading-tight">
                <div className="text-gray-300 text-xs">Deliver to</div>
                <div className="font-bold">United Kingdom</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 hidden md:flex items-center rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#f3a847]">
              <div className="bg-gray-100 text-gray-700 text-xs px-3 py-3 border-r border-gray-300">All</div>
              <input type="text" placeholder="Search draws..." className="flex-1 px-3 py-2 text-black outline-none" />
              <div className="bg-[#febd69] hover:bg-[#f3a847] px-4 py-2 cursor-pointer text-black">
                <Search size={20} />
              </div>
            </div>

            {/* Account & Lists */}
            <div className="hidden sm:block text-sm border border-transparent hover:border-white p-1 rounded-sm cursor-pointer leading-tight">
              <div className="text-xs text-white">Hello, sign in</div>
              <div className="font-bold">Account & Lists</div>
            </div>

            {/* Returns & Orders */}
            <div className="hidden lg:block text-sm border border-transparent hover:border-white p-1 rounded-sm cursor-pointer leading-tight">
              <div className="text-xs text-white">Returns</div>
              <div className="font-bold">& Orders</div>
            </div>

            {/* Cart */}
            <div className="flex items-end gap-1 border border-transparent hover:border-white p-1 rounded-sm cursor-pointer">
              <div className="relative">
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[#f3a847] font-bold text-sm">0</span>
                <ShoppingCart size={32} />
              </div>
              <span className="font-bold hidden sm:block">Basket</span>
            </div>
          </div>

          {/* Sub Nav */}
          <div className="bg-[#232f3e] px-4 py-1.5 flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1 border border-transparent hover:border-white px-1 rounded-sm cursor-pointer">
              <Menu size={20} /> All
            </div>
            <div className="border border-transparent hover:border-white px-1 rounded-sm cursor-pointer">Today's Deals</div>
            <div className="border border-transparent hover:border-white px-1 rounded-sm cursor-pointer">Customer Service</div>
            <div className="border border-transparent hover:border-white px-1 rounded-sm cursor-pointer">Registry</div>
            <div className="border border-transparent hover:border-white px-1 rounded-sm cursor-pointer hidden md:block">Gift Cards</div>
            <div className="border border-transparent hover:border-white px-1 rounded-sm cursor-pointer hidden md:block">Sell</div>
          </div>
        </header>

        {children}
        
        {/* Amazon-style Footer */}
        <footer className="mt-auto bg-[#232f3e] text-white text-sm">
          <div className="bg-[#37475a] hover:bg-[#485769] text-center py-4 cursor-pointer">
            Back to top
          </div>
          <div className="py-10 text-center">
            <p className="text-gray-300">© 2026, Great British Draw. Guaranteed Winners.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}