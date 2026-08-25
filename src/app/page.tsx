import Countdown from '@/components/Countdown';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-16">
      {/* Hero Section */}
      <div className="bg-white rounded-3xl border-4 border-slate-900 p-6 md:p-12 mb-16 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block bg-green-400 text-slate-900 font-bold px-4 py-1.5 rounded-full border-2 border-slate-900 mb-6 transform -rotate-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            Tickets from just £1!
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-slate-900 leading-[1.1]">
            Win Massive <br />
            <span className="text-sky-500">Cash Prizes!</span>
          </h1>
          <p className="text-lg text-slate-600 font-bold mb-8 max-w-md mx-auto md:mx-0">
            The most fun, affordable prize draws in the UK. Next draw takes place on the last day of the month at 10am!
          </p>
          
          <div className="bg-yellow-300 border-4 border-slate-900 p-4 rounded-2xl inline-block shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-center transform hover:scale-105 transition-transform">
            <span className="block text-sm font-black uppercase tracking-widest text-slate-800 mb-2">Draw Closes In:</span>
            <div className="text-3xl font-heading font-bold text-slate-900">
              <Countdown />
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full relative mt-8 md:mt-0">
           <div className="rounded-3xl overflow-hidden border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] bg-sky-200 transform rotate-2 hover:rotate-0 transition-transform duration-300">
             {/* Realistic relatable image prompt */}
             <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20photography%20of%20cheerful%20everyday%20british%20people%20celebrating%20with%20confetti%20bright%20sunny%20vibrant%20fun&image_size=landscape_4_3" alt="Happy Winners" className="w-full h-auto object-cover" />
           </div>
        </div>
      </div>

      {/* The 2 Draws */}
      <h2 className="text-4xl font-heading font-bold text-center mb-10 text-slate-900">Choose Your Draw! 👇</h2>
      
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
        {/* Monthly Edition */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] border-4 border-slate-900 flex flex-col hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] transition-all duration-300 group">
          <div className="h-56 relative border-b-4 border-slate-900 bg-sky-100 overflow-hidden">
            {/* Realistic pound notes prompt */}
            <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20photography%20of%20british%20twenty%20pound%20notes%20spread%20on%20a%20table%20bright%20lighting&image_size=landscape_4_3" alt="£10,000 Cash" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-4 left-4 bg-sky-400 text-slate-900 border-2 border-slate-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transform -rotate-2">
              Monthly Draw
            </div>
          </div>
          
          <div className="p-8 flex flex-col flex-1">
            <div className="text-5xl font-heading font-bold text-slate-900 mb-2">£10,000</div>
            <div className="text-lg font-bold text-sky-500 mb-6 uppercase tracking-wider">Guaranteed Cash Prize</div>
            
            <div className="space-y-4 font-bold text-slate-600 flex-1 mb-8">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
                <span>Entry Ticket</span>
                <span className="text-slate-900 text-xl font-black">£1.00</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
                <span>Weekly £500 Add-on</span>
                <span className="text-slate-900 bg-green-300 px-3 py-1 rounded-md border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transform rotate-2">+ 50p</span>
              </div>
              <div className="flex justify-between items-center bg-yellow-50 p-4 rounded-xl border-2 border-yellow-300 text-yellow-800">
                <span>Buy 10 or Direct Debit</span>
                <span className="font-black text-lg">2x Tickets!</span>
              </div>
            </div>

            <Link href="/checkout?type=standard" className="block w-full py-4 bg-sky-400 text-slate-900 rounded-2xl text-center text-xl font-heading font-bold border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:bg-sky-300 transition-colors hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
              Grab Your Ticket
            </Link>
          </div>
        </div>

        {/* High Roller Edition */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] border-4 border-slate-900 flex flex-col hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] transition-all duration-300 group">
          <div className="h-56 relative border-b-4 border-slate-900 bg-pink-100 overflow-hidden">
            {/* Realistic car prompt */}
            <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20photography%20of%20a%20shiny%20new%20blue%20suv%20parked%20in%20a%20suburban%20driveway%20sunny%20day&image_size=landscape_4_3" alt="£25,000 Prize" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-4 left-4 bg-pink-400 text-slate-900 border-2 border-slate-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transform -rotate-2">
              Mega Draw
            </div>
          </div>
          
          <div className="p-8 flex flex-col flex-1">
            <div className="text-5xl font-heading font-bold text-slate-900 mb-2">£25,000</div>
            <div className="text-lg font-bold text-pink-500 mb-6 uppercase tracking-wider">Bi-Monthly Mega Prize</div>
            
            <div className="space-y-4 font-bold text-slate-600 flex-1 mb-8">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
                <span>Entry Ticket</span>
                <span className="text-slate-900 text-xl font-black">£2.00</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
                <span>Weekly £1,500 Add-on</span>
                <span className="text-slate-900 bg-green-300 px-3 py-1 rounded-md border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transform rotate-2">+ 50p</span>
              </div>
              <div className="flex justify-between items-center bg-yellow-50 p-4 rounded-xl border-2 border-yellow-300 text-yellow-800">
                <span>Buy 10 or Direct Debit</span>
                <span className="font-black text-lg">2x Tickets!</span>
              </div>
            </div>

            <Link href="/checkout?type=high-roller" className="block w-full py-4 bg-pink-400 text-slate-900 rounded-2xl text-center text-xl font-heading font-bold border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:bg-pink-300 transition-colors hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
              Enter Mega Draw
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}