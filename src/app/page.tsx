import Countdown from '@/components/Countdown';
import Link from 'next/link';
import { Ticket, Calendar, Gift, Zap, Crown, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      {/* Funfair Striped Top Border */}
      <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,#e11d48,#e11d48_20px,#ffffff_20px,#ffffff_40px)] shadow-md"></div>
      
      <main className="container mx-auto px-6 py-12 md:py-20">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 border-2 border-amber-300 bg-amber-50 text-amber-900 rounded-full font-bold text-sm tracking-widest uppercase shadow-sm transform -rotate-1">
            <Star size={16} className="fill-amber-400 text-amber-500" />
            Step Right Up!
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black mb-8 text-slate-900 tracking-tight leading-[1.1]">
            The Great <br className="hidden md:block" />
            <span className="text-red-600 drop-shadow-sm">British</span> Draw
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Roll up, roll up! Premium competitions with guaranteed winners. The next grand draw takes place on the last day of the month at 10am.
          </p>

          <div className="max-w-md mx-auto p-8 bg-white border-2 border-slate-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-amber-400 to-blue-600"></div>
            <h3 className="text-xs font-bold mb-6 uppercase tracking-widest text-slate-400">Time until the draw</h3>
            <div className="text-slate-900">
              <Countdown />
            </div>
            <p className="mt-6 text-xs text-slate-500 font-bold">Winnings transferred the very next working day!</p>
          </div>
        </header>

        {/* Competitions */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard Draw */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border-2 border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative group hover:-translate-y-1 transition-transform">
            <div className="absolute top-8 right-8 font-bold uppercase tracking-widest text-blue-800 bg-blue-100 px-4 py-1.5 rounded-full text-[10px]">
              Monthly
            </div>
            <h2 className="text-3xl font-serif font-bold mb-2 text-slate-900">Standard Draw</h2>
            <div className="text-5xl font-black tracking-tight mb-8 text-blue-600 drop-shadow-sm">£10,000</div>
            
            <div className="space-y-5 mb-10 text-slate-600 font-medium">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 bg-blue-50 p-1.5 rounded-lg"><Ticket size={20} className="text-blue-500" /></div>
                <p>£1 per ticket entry into the primary draw.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 bg-green-50 p-1.5 rounded-lg"><Calendar size={20} className="text-green-500" /></div>
                <p>Add 50p to also enter the Weekly £500 draw.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 bg-amber-50 p-1.5 rounded-lg"><Zap size={20} className="text-amber-500" /></div>
                <p>Buy 10 tickets, receive 20. Double your total with Direct Debit.</p>
              </div>
            </div>

            <Link href="/checkout?type=standard" className="block w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-xl font-bold text-lg shadow-lg shadow-blue-600/30 transition-all active:scale-95">
              Grab Your Ticket
            </Link>
          </div>

          {/* High Roller Draw */}
          <div className="bg-slate-900 rounded-3xl p-8 md:p-10 border-2 border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.15)] relative group hover:-translate-y-1 transition-transform">
            <div className="absolute top-8 right-8 font-bold uppercase tracking-widest text-amber-900 bg-amber-400 px-4 py-1.5 rounded-full text-[10px]">
              VIP
            </div>
            <h2 className="text-3xl font-serif font-bold mb-2 text-white">High Roller</h2>
            <div className="text-5xl font-black tracking-tight mb-8 text-amber-400 drop-shadow-md">£25,000</div>
            
            <div className="space-y-5 mb-10 text-slate-300 font-medium">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 bg-slate-800 p-1.5 rounded-lg"><Crown size={20} className="text-amber-400" /></div>
                <p>£2 per ticket entry into the Bi-Monthly draw.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 bg-slate-800 p-1.5 rounded-lg"><Gift size={20} className="text-pink-400" /></div>
                <p>Add 50p to also enter the Weekly High Roller (£1,500).</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 bg-slate-800 p-1.5 rounded-lg"><Zap size={20} className="text-amber-400" /></div>
                <p>Buy 10 tickets, receive 20. Double your total with Direct Debit.</p>
              </div>
            </div>

            <Link href="/checkout?type=high-roller" className="block w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white text-center rounded-xl font-bold text-lg shadow-lg shadow-red-900/50 transition-all active:scale-95">
              Enter High Roller
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}