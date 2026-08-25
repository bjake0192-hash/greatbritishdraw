import Countdown from '@/components/Countdown';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
        <div className="flex-1 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            Next Draw Approaching
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 tracking-tight leading-[1.1] text-zinc-900">
            A new standard in <br className="hidden lg:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">premium competitions.</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-xl font-medium mb-10 leading-relaxed">
            Two exclusive draws. Guaranteed winners. The next grand event concludes on the final day of the month at 10:00 AM.
          </p>
          
          <div className="inline-flex flex-col items-start border-l-4 border-yellow-400 bg-white px-8 py-6 rounded-r-2xl shadow-md">
            <span className="text-xs uppercase tracking-widest text-zinc-400 mb-2 font-bold">Draw closes in</span>
            <div className="text-3xl font-serif text-zinc-900 tracking-wide">
              <Countdown />
            </div>
          </div>
        </div>
        <div className="flex-1 w-full relative">
           {/* Hero Image */}
           <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
             <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=luxury%20editorial%20photography%20floating%20golden%20lottery%20tickets%20confetti%20vibrant%20warm%20background%203d%20render%20professional&image_size=landscape_4_3" alt="Premium Competitions" className="w-full h-auto object-cover" />
             <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent mix-blend-overlay"></div>
           </div>
        </div>
      </div>

      {/* The 2 Draws */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
        {/* Monthly Edition */}
        <div className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-zinc-100 hover:-translate-y-2">
          <div className="h-64 overflow-hidden relative">
            <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=luxury%20sleek%20modern%20sports%20car%20with%20a%20red%20ribbon%20premium%20photography%20studio%20lighting&image_size=landscape_4_3" alt="Monthly Prize" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-blue-600 shadow-sm">
              Monthly Edition
            </div>
          </div>
          <div className="p-10 flex flex-col flex-1 bg-gradient-to-b from-blue-50/50 to-white">
            <div className="mb-8">
              <div className="text-5xl md:text-6xl font-serif text-blue-900 tracking-tight">£10,000</div>
              <div className="text-sm text-blue-600/80 font-bold mt-2 uppercase tracking-wider">Guaranteed Cash Prize</div>
            </div>
            
            <div className="space-y-4 text-zinc-600 font-medium text-sm flex-1">
              <div className="flex justify-between border-b border-blue-100 pb-4">
                <span>Entry Fee</span>
                <span className="text-blue-900 font-bold text-lg">£1.00</span>
              </div>
              <div className="flex justify-between border-b border-blue-100 pb-4 items-center">
                <span>Weekly Add-on (£500 Prize)</span>
                <span className="text-blue-900 font-bold bg-blue-100 px-2 py-1 rounded-md">+ £0.50</span>
              </div>
              <div className="flex justify-between pb-4 items-center">
                <span>Direct Debit / Volume Perk</span>
                <span className="text-pink-600 font-bold bg-pink-100 px-2 py-1 rounded-md">2x Tickets</span>
              </div>
            </div>

            <Link href="/checkout?type=standard" className="mt-8 block w-full py-4 bg-blue-600 text-white rounded-xl text-center text-sm font-bold uppercase tracking-widest hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300">
              Enter Draw
            </Link>
          </div>
        </div>

        {/* High Roller Edition */}
        <div className="group flex flex-col bg-zinc-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-zinc-800 hover:-translate-y-2">
          <div className="h-64 overflow-hidden relative">
            <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=glowing%20gold%20bars%20and%20stacks%20of%20cash%20on%20dark%20velvet%20cinematic%20luxury%208k&image_size=landscape_4_3" alt="High Roller Prize" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-yellow-400 border border-yellow-400/30 shadow-lg">
              VIP Edition
            </div>
          </div>
          <div className="p-10 flex flex-col flex-1 bg-gradient-to-b from-purple-900/20 to-zinc-900">
            <div className="mb-8">
              <div className="text-5xl md:text-6xl font-serif tracking-tight text-yellow-400 drop-shadow-md">£25,000</div>
              <div className="text-sm text-yellow-400/80 font-bold mt-2 uppercase tracking-wider">Bi-Monthly Mega Prize</div>
            </div>
            
            <div className="space-y-4 text-zinc-300 font-medium text-sm flex-1 relative z-10">
              <div className="flex justify-between border-b border-zinc-800 pb-4">
                <span>Entry Fee</span>
                <span className="text-white font-bold text-lg">£2.00</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-4 items-center">
                <span>Weekly Add-on (£1,500 Prize)</span>
                <span className="text-white font-bold bg-zinc-800 px-2 py-1 rounded-md">+ £0.50</span>
              </div>
              <div className="flex justify-between pb-4 items-center">
                <span>Direct Debit / Volume Perk</span>
                <span className="text-yellow-400 font-bold bg-yellow-400/10 border border-yellow-400/20 px-2 py-1 rounded-md">2x Tickets</span>
              </div>
            </div>

            <Link href="/checkout?type=high-roller" className="relative z-10 mt-8 block w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-zinc-900 rounded-xl text-center text-sm font-bold uppercase tracking-widest hover:from-yellow-400 hover:to-yellow-300 hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300">
              Enter High Roller
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}