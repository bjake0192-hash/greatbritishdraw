import Countdown from '@/components/Countdown';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-24">
        <span className="text-xs uppercase tracking-[0.2em] font-medium text-zinc-500 mb-6">Est. 2026</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 tracking-tight max-w-4xl leading-[1.1] text-zinc-900">
          A new standard in <br className="hidden md:block"/> premium competitions.
        </h1>
        <p className="text-lg text-zinc-600 max-w-xl font-light mb-12">
          Two exclusive draws. Guaranteed winners. The next event concludes on the final day of the month at 10:00 AM.
        </p>
        
        <div className="flex flex-col items-center border border-zinc-200 bg-white px-12 py-8 rounded-sm shadow-sm relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-zinc-400"></div>
          <span className="text-xs uppercase tracking-[0.15em] text-zinc-400 mb-4 font-semibold">Draw closes in</span>
          <div className="text-2xl font-serif text-zinc-900 tracking-wide">
            <Countdown />
          </div>
        </div>
      </div>

      {/* The 2 Draws */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
        {/* Monthly Edition */}
        <div className="group flex flex-col border border-zinc-200 bg-white p-10 hover:border-zinc-400 transition-colors duration-500">
          <div className="mb-12 relative">
            <h2 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4 font-semibold">Monthly Edition</h2>
            <div className="text-6xl font-serif text-zinc-900 tracking-tight">£10,000</div>
          </div>
          
          <div className="space-y-4 text-zinc-600 font-light text-sm flex-1">
            <div className="flex justify-between border-b border-zinc-100 pb-4">
              <span>Entry Fee</span>
              <span className="text-zinc-900 font-medium">£1.00</span>
            </div>
            <div className="flex justify-between border-b border-zinc-100 pb-4">
              <span>Weekly Add-on (£500 Prize)</span>
              <span className="text-zinc-900 font-medium">+ £0.50</span>
            </div>
            <div className="flex justify-between pb-4">
              <span>Direct Debit / Volume Perk</span>
              <span className="text-zinc-900 font-medium">2x Tickets</span>
            </div>
          </div>

          <Link href="/checkout?type=standard" className="mt-8 block w-full py-4 border border-zinc-900 bg-zinc-900 text-white text-center text-xs uppercase tracking-[0.15em] hover:bg-transparent hover:text-zinc-900 transition-colors duration-300">
            Enter Draw
          </Link>
        </div>

        {/* High Roller Edition */}
        <div className="group flex flex-col border border-zinc-900 bg-zinc-900 text-white p-10 hover:bg-zinc-800 transition-colors duration-500 relative overflow-hidden">
          <div className="mb-12 relative z-10">
            <h2 className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-4 font-semibold">High Roller Edition</h2>
            <div className="text-6xl font-serif tracking-tight text-white">£25,000</div>
          </div>
          
          <div className="space-y-4 text-zinc-400 font-light text-sm flex-1 relative z-10">
            <div className="flex justify-between border-b border-zinc-800 pb-4">
              <span>Entry Fee</span>
              <span className="text-white font-medium">£2.00</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-4">
              <span>Weekly Add-on (£1,500 Prize)</span>
              <span className="text-white font-medium">+ £0.50</span>
            </div>
            <div className="flex justify-between pb-4">
              <span>Direct Debit / Volume Perk</span>
              <span className="text-white font-medium">2x Tickets</span>
            </div>
          </div>

          <Link href="/checkout?type=high-roller" className="relative z-10 mt-8 block w-full py-4 border border-white bg-white text-zinc-900 text-center text-xs uppercase tracking-[0.15em] hover:bg-transparent hover:text-white transition-colors duration-300">
            Enter High Roller
          </Link>
        </div>
      </div>
    </div>
  );
}