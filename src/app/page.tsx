import Countdown from '@/components/Countdown';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto w-full flex-1">
      {/* Hero Banner Carousel-style */}
      <div className="relative bg-gradient-to-r from-[#146eb4] to-[#2995db] text-white p-6 md:p-12 mb-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Prime Competitions. Guaranteed Winners.</h1>
            <p className="text-lg md:text-xl mb-6">The next draw takes place on the last day of the month at 10am.</p>
            <p className="text-sm">✓ Fast transfers  ✓ Secure checkout  ✓ Verified winners</p>
          </div>
          
          <div className="bg-white text-black p-6 rounded-md shadow-lg min-w-[300px]">
            <h3 className="text-sm font-bold text-red-700 uppercase tracking-wider mb-2">Deal Ends In</h3>
            <div className="text-2xl font-bold mb-4">
              <Countdown />
            </div>
            <p className="text-xs text-gray-500">Draw closes at 10:00 AM (UK). Winnings transferred next working day.</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Standard Draw Card */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-200 flex flex-col h-full">
            <div className="bg-gray-100 h-48 mb-4 flex items-center justify-center relative overflow-hidden">
              <span className="absolute top-2 left-2 bg-[#c45500] text-white text-xs px-2 py-1 font-bold rounded-sm">#1 Best Seller</span>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#007185]">£10,000</div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-widest mt-1">Monthly Prize</div>
              </div>
            </div>
            
            <h2 className="text-lg font-medium text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer mb-1">
              Standard Monthly Ticket - Win £10,000 Guaranteed
            </h2>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-[#ffa41c]">★★★★★</span>
              <span className="text-sm text-[#007185] hover:underline cursor-pointer">8,492 ratings</span>
            </div>
            
            <div className="text-2xl font-semibold mb-1 flex items-start">
              <span className="text-sm mt-1">£</span>1<span className="text-sm mt-1">.00</span>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <span className="text-[#007185]">FREE Returns</span> on eligible items
            </div>
            
            <ul className="text-sm space-y-2 mb-6 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-[#007185] font-bold">✓</span> £1 per ticket entry
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007185] font-bold">✓</span> Add 50p for Weekly £500 draw
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007185] font-bold">✓</span> <span className="font-bold">Buy 10, get 20</span>
              </li>
            </ul>
            
            <Link href="/checkout?type=standard" className="bg-[#ffd814] hover:bg-[#f7ca00] text-center py-2.5 rounded-full shadow-sm text-sm font-medium border border-[#fcd200]">
              Add to Basket
            </Link>
          </div>

          {/* High Roller Card */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-200 flex flex-col h-full">
            <div className="bg-gray-100 h-48 mb-4 flex items-center justify-center relative overflow-hidden">
              <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 font-bold rounded-sm">Premium Choice</span>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#007185]">£25,000</div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-widest mt-1">Bi-Monthly Prize</div>
              </div>
            </div>
            
            <h2 className="text-lg font-medium text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer mb-1">
              High Roller VIP Ticket - Win £25,000 Guaranteed
            </h2>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-[#ffa41c]">★★★★★</span>
              <span className="text-sm text-[#007185] hover:underline cursor-pointer">1,204 ratings</span>
            </div>
            
            <div className="text-2xl font-semibold mb-1 flex items-start">
              <span className="text-sm mt-1">£</span>2<span className="text-sm mt-1">.00</span>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <span className="text-[#007185]">FREE Returns</span> on eligible items
            </div>
            
            <ul className="text-sm space-y-2 mb-6 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-[#007185] font-bold">✓</span> £2 per ticket entry
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007185] font-bold">✓</span> Add 50p for Weekly £1,500 draw
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007185] font-bold">✓</span> <span className="font-bold">Buy 10, get 20</span>
              </li>
            </ul>
            
            <Link href="/checkout?type=high-roller" className="bg-[#ffd814] hover:bg-[#f7ca00] text-center py-2.5 rounded-full shadow-sm text-sm font-medium border border-[#fcd200]">
              Add to Basket
            </Link>
          </div>

          {/* Promotional Card */}
          <div className="bg-white p-6 rounded shadow-sm border border-gray-200 flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4">Unlock Double Tickets</h2>
            <div className="bg-gray-100 flex-1 mb-4 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-[#ffd814] rounded-full flex items-center justify-center mb-4 shadow-sm border border-[#fcd200]">
                <span className="font-bold text-xl text-black">2x</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Set up Direct Debit</h3>
              <p className="text-sm text-gray-600">Select Direct Debit at checkout to automatically double your ticket allocation for every future draw.</p>
            </div>
            <div className="text-sm text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">
              Learn more about Direct Debit subscriptions
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}