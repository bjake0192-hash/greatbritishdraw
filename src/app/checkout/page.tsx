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
    <div className="max-w-3xl mx-auto py-16 px-6 w-full flex-1">
      <div className="mb-12">
        <Link href="/" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">← Return to draws</Link>
        <h1 className="text-4xl md:text-5xl font-serif mt-8 text-zinc-900 tracking-tight">
          {isHighRoller ? 'High Roller Edition' : 'Monthly Edition'}
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
        <div className="md:col-span-2 space-y-12">
          {/* Allocation */}
          <section>
            <h2 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 border-b border-zinc-200 pb-3 font-semibold">Allocation</h2>
            <div className="flex items-center justify-between group">
              <span className="text-zinc-600 font-light">Number of entries</span>
              <input 
                type="number" 
                min="1" 
                value={ticketCount} 
                onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 border-b border-zinc-300 py-2 text-center text-2xl font-serif text-zinc-900 focus:outline-none focus:border-zinc-900 bg-transparent transition-colors"
              />
            </div>
            {isBuy10Offer && (
              <p className="text-xs text-zinc-500 mt-4 italic tracking-wide">Volume perk applied: allocation doubled.</p>
            )}
          </section>

          {/* Enhancements */}
          <section>
            <h2 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 border-b border-zinc-200 pb-3 font-semibold">Enhancements</h2>
            <div className="space-y-6">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="mt-1 flex items-center justify-center w-5 h-5 border border-zinc-300 rounded-sm group-hover:border-zinc-900 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={addWeekly} 
                    onChange={(e) => setAddWeekly(e.target.checked)}
                    className="w-3 h-3 text-zinc-900 border-none rounded-none focus:ring-0 accent-zinc-900 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="font-medium text-zinc-900 tracking-wide">Include Weekly Draw (+£0.50/entry)</div>
                  <div className="text-sm text-zinc-500 font-light mt-1">Enter the weekly draw for a chance to win {isHighRoller ? '£1,500' : '£500'}.</div>
                </div>
              </label>

              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="mt-1 flex items-center justify-center w-5 h-5 border border-zinc-300 rounded-sm group-hover:border-zinc-900 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={directDebit} 
                    onChange={(e) => setDirectDebit(e.target.checked)}
                    className="w-3 h-3 text-zinc-900 border-none rounded-none focus:ring-0 accent-zinc-900 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="font-medium text-zinc-900 tracking-wide">Direct Debit Subscription</div>
                  <div className="text-sm text-zinc-500 font-light mt-1">Receive double entries on every future draw automatically.</div>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Summary */}
        <div className="md:col-span-1">
          <div className="bg-white border border-zinc-200 p-8 sticky top-24 shadow-sm">
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 border-b border-zinc-200 pb-3 font-semibold">Summary</h3>
            
            <div className="space-y-4 text-sm font-light text-zinc-600 mb-8">
              <div className="flex justify-between">
                <span>Base ({ticketCount})</span>
                <span>£{(ticketCount * basePrice).toFixed(2)}</span>
              </div>
              {addWeekly && (
                <div className="flex justify-between">
                  <span>Weekly</span>
                  <span>£{(ticketCount * weeklyAddOnPrice).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-4 border-t border-zinc-100 text-zinc-900">
                <span>Total Entries</span>
                <span className="font-medium text-lg">{totalTickets}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="text-sm font-medium text-zinc-900 uppercase tracking-widest">Total</span>
              <span className="text-3xl font-serif text-zinc-900 tracking-tight">£{totalPrice.toFixed(2)}</span>
            </div>

            <button 
              onClick={handlePurchase}
              disabled={isSubmitting}
              className="w-full py-4 border border-zinc-900 bg-zinc-900 text-white text-xs uppercase tracking-[0.15em] hover:bg-transparent hover:text-zinc-900 transition-colors duration-300 disabled:opacity-50 disabled:hover:bg-zinc-900 disabled:hover:text-white"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Entry'}
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