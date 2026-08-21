import Countdown from '@/components/Countdown';
import Link from 'next/link';
import { Ticket, Calendar, Gift, Zap, Crown } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-sans text-white">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 bg-yellow-400 text-yellow-900 rounded-full font-bold text-sm tracking-widest uppercase shadow-lg transform -rotate-2">
            The Great British Draw
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-lg leading-tight">
            Win Big. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Every Single Week.</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl mx-auto font-medium">
            Next massive draw happens on the last day of the month at 10am UK time. Don&apos;t miss out!
          </p>

          <div className="max-w-md mx-auto mb-12">
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-pink-200">Time until next draw:</h3>
            <Countdown />
            <p className="mt-4 text-sm opacity-80">Winners contacted & transferred the next working day!</p>
          </div>
        </header>

        {/* Competitions */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard Draw */}
          <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden transform hover:scale-[1.02] transition-transform border-4 border-transparent hover:border-yellow-400">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-6 py-2 rounded-bl-2xl font-bold flex items-center gap-2">
              <Ticket size={18} /> Most Popular
            </div>
            <h2 className="text-3xl font-black mb-2 text-blue-600">Standard Draw</h2>
            <div className="text-5xl font-black mb-6">£10,000 <span className="text-lg text-slate-500 font-bold">Monthly Prize</span></div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 font-medium">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Calendar size={20} /></div>
                £1 per ticket for the Monthly Draw
              </li>
              <li className="flex items-center gap-3 font-medium">
                <div className="bg-green-100 p-2 rounded-full text-green-600"><Gift size={20} /></div>
                Add 50p to enter the Weekly Draw (£500 Prize!)
              </li>
              <li className="flex items-center gap-3 font-medium text-purple-700 bg-purple-50 p-3 rounded-xl border border-purple-200">
                <Zap size={20} className="text-yellow-500" />
                Buy 10 tickets, get 20! (Direct debit doubles tickets!)
              </li>
            </ul>

            <Link href="/checkout?type=standard" className="block w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-xl font-bold text-xl transition-colors shadow-lg shadow-blue-600/30">
              Enter Standard Draw
            </Link>
          </div>

          {/* High Roller Draw */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden transform hover:scale-[1.02] transition-transform border-4 border-transparent hover:border-pink-500">
            <div className="absolute top-0 right-0 bg-pink-500 text-white px-6 py-2 rounded-bl-2xl font-bold flex items-center gap-2">
              <Crown size={18} /> VIP
            </div>
            <h2 className="text-3xl font-black mb-2 text-pink-400">High Roller</h2>
            <div className="text-5xl font-black mb-6">£25,000 <span className="text-lg text-slate-400 font-bold">Bi-Monthly Prize</span></div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 font-medium">
                <div className="bg-slate-800 p-2 rounded-full text-pink-400"><Calendar size={20} /></div>
                £2 per ticket for the Bi-Monthly Draw
              </li>
              <li className="flex items-center gap-3 font-medium">
                <div className="bg-slate-800 p-2 rounded-full text-green-400"><Gift size={20} /></div>
                Add 50p to enter the Weekly High Roller (£1,500 Prize!)
              </li>
              <li className="flex items-center gap-3 font-medium text-yellow-300 bg-slate-800 p-3 rounded-xl border border-slate-700">
                <Zap size={20} className="text-yellow-500" />
                Buy 10 tickets, get 20! (Direct debit doubles tickets!)
              </li>
            </ul>

            <Link href="/checkout?type=high-roller" className="block w-full py-4 px-6 bg-pink-600 hover:bg-pink-700 text-white text-center rounded-xl font-bold text-xl transition-colors shadow-lg shadow-pink-600/30">
              Enter High Roller Draw
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
