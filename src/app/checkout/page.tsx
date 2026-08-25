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
    <div className="max-w-4xl mx-auto py-12 px-4 w-full flex-1">
      <div className="mb-10 text-center">
        <Link href="/" className="inline-block mb-4 text-sm font-bold uppercase tracking-widest text-sky-500 hover:text-sky-600 transition-colors border-2 border-transparent hover:border-sky-500 rounded-full px-4 py-1">← Back to draws</Link>
        <h1 className="text-5xl font-heading font-bold text-slate-900 leading-tight">
          {isHighRoller ? 'Mega Draw Ticket' : 'Monthly Draw Ticket'}
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Allocation */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="bg-yellow-400 text-slate-900 w-8 h-8 flex items-center justify-center rounded-full border-2 border-slate-900 text-sm">1</span>
              How many tickets?
            </h2>
            <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <span className="text-slate-600 font-bold text-lg flex-1">Tickets</span>
              <input 
                type="number" 
                min="1" 
                value={ticketCount} 
                onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 border-4 border-slate-900 rounded-xl py-2 text-center text-2xl font-black text-slate-900 focus:outline-none focus:border-sky-500 bg-white transition-colors"
              />
            </div>
            {isBuy10Offer && (
              <div className="mt-4 bg-yellow-300 border-2 border-slate-900 text-slate-900 p-4 rounded-xl text-lg font-black flex items-center gap-3 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transform -rotate-1">
                <span className="text-2xl">🎉</span> Woohoo! Tickets Doubled!
              </div>
            )}
          </section>

          {/* Enhancements */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="bg-sky-400 text-slate-900 w-8 h-8 flex items-center justify-center rounded-full border-2 border-slate-900 text-sm">2</span>
              Power-ups!
            </h2>
            <div className="space-y-4">
              <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-2xl border-2 border-slate-200 hover:border-slate-900 hover:bg-green-50 transition-all">
                <div className="mt-1 flex items-center justify-center w-8 h-8 border-4 border-slate-900 rounded-lg group-hover:bg-white transition-colors bg-white">
                  <input 
                    type="checkbox" 
                    checked={addWeekly} 
                    onChange={(e) => setAddWeekly(e.target.checked)}
                    className="w-5 h-5 text-green-500 border-none rounded focus:ring-0 accent-green-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xl">Include Weekly Draw (+50p)</div>
                  <div className="text-base text-slate-600 font-bold mt-1">Enter the weekly draw for a chance to win {isHighRoller ? '£1,500' : '£500'} cash.</div>
                </div>
              </label>

              <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-2xl border-2 border-slate-200 hover:border-slate-900 hover:bg-yellow-50 transition-all">
                <div className="mt-1 flex items-center justify-center w-8 h-8 border-4 border-slate-900 rounded-lg group-hover:bg-white transition-colors bg-white">
                  <input 
                    type="checkbox" 
                    checked={directDebit} 
                    onChange={(e) => setDirectDebit(e.target.checked)}
                    className="w-5 h-5 text-yellow-500 border-none rounded focus:ring-0 accent-yellow-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xl">Direct Debit Subscription</div>
                  <div className="text-base text-slate-600 font-bold mt-1">Get 2x tickets on every future draw automatically. Cancel anytime.</div>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Summary */}
        <div className="md:col-span-1">
          <div className="bg-sky-200 text-slate-900 p-6 md:p-8 rounded-3xl sticky top-24 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-2xl font-heading font-black text-slate-900 mb-6 pb-4 border-b-4 border-slate-900">Your Order</h3>
            
            <div className="space-y-4 text-lg font-bold text-slate-700 mb-8">
              <div className="flex justify-between">
                <span>Base ({ticketCount})</span>
                <span className="text-slate-900">£{(ticketCount * basePrice).toFixed(2)}</span>
              </div>
              {addWeekly && (
                <div className="flex justify-between">
                  <span>Weekly</span>
                  <span className="text-slate-900">£{(ticketCount * weeklyAddOnPrice).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-4 border-t-4 border-slate-900 text-slate-900 bg-white p-3 rounded-xl border-2 mt-4">
                <span>Total Tickets</span>
                <span className="font-black text-2xl text-pink-500">{totalTickets}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8 bg-white p-4 rounded-xl border-4 border-slate-900 transform rotate-2">
              <span className="text-lg font-black text-slate-900 uppercase">Total</span>
              <span className="text-4xl font-heading font-black text-slate-900">£{totalPrice.toFixed(2)}</span>
            </div>

            <button 
              onClick={handlePurchase}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-green-400 text-slate-900 text-xl font-heading font-black border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:bg-green-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Hold tight...' : 'Get My Tickets!'}
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