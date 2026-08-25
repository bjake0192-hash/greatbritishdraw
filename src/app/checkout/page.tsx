'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'standard';
  
  const isHighRoller = type === 'high-roller';
  const basePrice = isHighRoller ? 2 : 1;
  const weeklyAddOnPrice = 0.5;

  const [ticketCount, setTicketCount] = useState(1);
  const [addWeekly, setAddWeekly] = useState(false);
  const [directDebit, setDirectDebit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isBuy10Offer = ticketCount >= 10;
  let totalTickets = ticketCount;
  
  if (isBuy10Offer) {
    totalTickets *= 2;
  }
  if (directDebit) {
    totalTickets *= 2;
  }

  const totalPrice = (ticketCount * basePrice) + (addWeekly ? ticketCount * weeklyAddOnPrice : 0);

  const handlePurchase = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          baseTickets: ticketCount,
          totalTickets,
          addWeekly,
          directDebit,
          totalPrice
        })
      });
      alert('Entry secured successfully. Best of luck.');
      window.location.href = '/';
    } catch (e) {
      alert('Transaction failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 w-full flex-1">
      <div className="mb-12">
        <Link href="/" className="text-xs font-bold uppercase tracking-widest text-pink-500 hover:text-pink-600 transition-colors">← Return to draws</Link>
        <h1 className="text-4xl md:text-5xl font-serif mt-6 text-zinc-900 tracking-tight">
          {isHighRoller ? 'High Roller VIP Entry' : 'Standard Monthly Entry'}
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2 space-y-8">
          {/* Allocation */}
          <section className="bg-white p-8 rounded-3xl shadow-lg border border-zinc-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-pink-500"></div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 pb-3 border-b border-zinc-100">Ticket Allocation</h2>
            <div className="flex items-center justify-between group">
              <span className="text-zinc-700 font-medium">Number of entries</span>
              <input 
                type="number" 
                min="1" 
                value={ticketCount} 
                onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 border-b-2 border-zinc-200 py-2 text-center text-3xl font-serif text-zinc-900 focus:outline-none focus:border-pink-500 bg-transparent transition-colors"
              />
            </div>
            {isBuy10Offer && (
              <div className="mt-6 bg-pink-50 border border-pink-100 text-pink-700 p-4 rounded-xl text-sm font-bold flex items-center gap-3">
                <span className="text-xl">🎉</span> Volume perk applied: allocation doubled!
              </div>
            )}
          </section>

          {/* Enhancements */}
          <section className="bg-white p-8 rounded-3xl shadow-lg border border-zinc-100">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 pb-3 border-b border-zinc-100">Enhancements</h2>
            <div className="space-y-4">
              <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-2xl border border-zinc-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                <div className="mt-1 flex items-center justify-center w-6 h-6 border-2 border-zinc-300 rounded-md group-hover:border-blue-500 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={addWeekly} 
                    onChange={(e) => setAddWeekly(e.target.checked)}
                    className="w-4 h-4 text-blue-500 border-none rounded-sm focus:ring-0 accent-blue-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="font-bold text-zinc-900 tracking-wide text-lg">Include Weekly Draw (+£0.50)</div>
                  <div className="text-sm text-zinc-500 font-medium mt-1">Enter the weekly draw for a chance to win {isHighRoller ? '£1,500' : '£500'}.</div>
                </div>
              </label>

              <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-2xl border border-zinc-100 hover:border-yellow-300 hover:bg-yellow-50/50 transition-all">
                <div className="mt-1 flex items-center justify-center w-6 h-6 border-2 border-zinc-300 rounded-md group-hover:border-yellow-500 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={directDebit} 
                    onChange={(e) => setDirectDebit(e.target.checked)}
                    className="w-4 h-4 text-yellow-500 border-none rounded-sm focus:ring-0 accent-yellow-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="font-bold text-zinc-900 tracking-wide text-lg">Direct Debit Subscription</div>
                  <div className="text-sm text-zinc-500 font-medium mt-1">Receive double entries on every future draw automatically.</div>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Summary */}
        <div className="md:col-span-1">
          <div className="bg-zinc-900 text-white p-8 rounded-3xl sticky top-24 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-500/20 to-transparent rounded-bl-full"></div>
            
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 pb-3 border-b border-zinc-800 relative z-10">Order Summary</h3>
            
            <div className="space-y-4 text-sm font-medium text-zinc-300 mb-8 relative z-10">
              <div className="flex justify-between">
                <span>Base ({ticketCount})</span>
                <span className="text-white">£{(ticketCount * basePrice).toFixed(2)}</span>
              </div>
              {addWeekly && (
                <div className="flex justify-between">
                  <span>Weekly</span>
                  <span className="text-white">£{(ticketCount * weeklyAddOnPrice).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-4 border-t border-zinc-800 text-yellow-400">
                <span>Total Entries</span>
                <span className="font-bold text-lg">{totalTickets}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8 relative z-10">
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Total</span>
              <span className="text-4xl font-serif text-white tracking-tight">£{totalPrice.toFixed(2)}</span>
            </div>

            <button 
              onClick={handlePurchase}
              disabled={isSubmitting}
              className="relative z-10 w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-pink-500/40 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Secure Entry'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center font-light tracking-widest uppercase text-sm text-zinc-500">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}