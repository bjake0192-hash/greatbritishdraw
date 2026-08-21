import Countdown from '@/components/Countdown';
import Link from 'next/link';
import { Ticket, Calendar, Gift, Zap, Crown } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12 md:py-24">
        <header className="text-center mb-24">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-zinc-200 text-zinc-600 rounded-full font-medium text-xs tracking-widest uppercase bg-white shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Competitions
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-8 text-zinc-950 tracking-tight leading-[1.1]">
            The Great <br className="hidden md:block" />
            <span className="italic text-zinc-500">British</span> Draw.
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Premium competitions with guaranteed winners. The next draw takes place on the last day of the month at 10am.
          </p>

          <div className="max-w-md mx-auto p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm">
            <h3 className="text-xs font-semibold mb-6 uppercase tracking-widest text-zinc-400">Time remaining</h3>
            <div className="text-zinc-900">
              <Countdown />
            </div>
            <p className="mt-6 text-xs text-zinc-500 font-medium">Winnings transferred the next working day.</p>
          </div>
        </header>

        {/* Competitions */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Standard Draw */}
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-zinc-200 shadow-sm relative group hover:border-zinc-300 transition-colors">
            <div className="absolute top-8 right-8 text-[10px] font-bold uppercase tracking-widest text-zinc-900 bg-zinc-100 px-3 py-1 rounded-full">
              Standard
            </div>
            <h2 className="text-2xl font-serif mb-2 text-zinc-900">Monthly Draw</h2>
            <div className="text-5xl font-light tracking-tight mb-8 text-zinc-950">£10,000</div>
            
            <div className="space-y-5 mb-10 text-zinc-600 text-sm md:text-base">
              <div className="flex items-start gap-4">
                <div className="mt-0.5"><Ticket size={18} className="text-zinc-400" /></div>
                <p>£1 per ticket entry into the primary draw.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5"><Calendar size={18} className="text-zinc-400" /></div>
                <p>Add 50p to also enter the Weekly £500 draw.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5"><Zap size={18} className="text-zinc-400" /></div>
                <p>Buy 10 tickets, receive 20. Double your total with Direct Debit.</p>
              </div>
            </div>

            <Link href="/checkout?type=standard" className="block w-full py-4 px-6 bg-zinc-950 hover:bg-zinc-800 text-white text-center rounded-xl font-medium transition-colors">
              Enter Draw
            </Link>
          </div>

          {/* High Roller Draw */}
          <div className="bg-zinc-950 rounded-2xl p-8 md:p-10 border border-zinc-800 shadow-sm relative group hover:border-zinc-700 transition-colors">
            <div className="absolute top-8 right-8 text-[10px] font-bold uppercase tracking-widest text-zinc-950 bg-white px-3 py-1 rounded-full">
              VIP
            </div>
            <h2 className="text-2xl font-serif mb-2 text-white">High Roller</h2>
            <div className="text-5xl font-light tracking-tight mb-8 text-white">£25,000</div>
            
            <div className="space-y-5 mb-10 text-zinc-400 text-sm md:text-base">
              <div className="flex items-start gap-4">
                <div className="mt-0.5"><Ticket size={18} className="text-zinc-600" /></div>
                <p>£2 per ticket entry into the Bi-Monthly draw.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5"><Calendar size={18} className="text-zinc-600" /></div>
                <p>Add 50p to also enter the Weekly High Roller (£1,500).</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5"><Zap size={18} className="text-zinc-600" /></div>
                <p>Buy 10 tickets, receive 20. Double your total with Direct Debit.</p>
              </div>
            </div>

            <Link href="/checkout?type=high-roller" className="block w-full py-4 px-6 bg-white hover:bg-zinc-200 text-zinc-950 text-center rounded-xl font-medium transition-colors">
              Enter High Roller
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
