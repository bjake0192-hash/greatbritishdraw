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
    totalTickets *= 2; // Doubled again if direct debit? The prompt said "If a user buys 10 tickets they get 20 and if they set up a direct debit they get double the tickets." I assume they stack or just double the base. Let's stack them for fun!
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
      alert('Purchase successful! Good luck!');
      window.location.href = '/';
    } catch (e) {
      alert('Purchase failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 md:py-24 px-6 text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-zinc-200 shadow-sm p-8 md:p-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-zinc-950">
            {isHighRoller ? 'High Roller' : 'Monthly Draw'}
          </h1>
          <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Cancel</Link>
        </div>

        <div className="space-y-8">
          {/* Ticket Count */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">Number of tickets</label>
            <input 
              type="number" 
              min="1" 
              value={ticketCount} 
              onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full text-3xl font-light p-4 border-b-2 border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors bg-transparent rounded-none"
            />
            {isBuy10Offer && (
              <p className="text-emerald-600 font-medium mt-3 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Volume offer applied: Tickets doubled
              </p>
            )}
          </div>

          {/* Add Weekly */}
          <label className="flex items-start gap-4 p-5 border border-zinc-200 rounded-xl cursor-pointer hover:border-zinc-400 transition-colors group">
            <div className="mt-0.5">
              <input 
                type="checkbox" 
                checked={addWeekly} 
                onChange={(e) => setAddWeekly(e.target.checked)}
                className="w-5 h-5 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-900 accent-zinc-900"
              />
            </div>
            <div>
              <div className="font-medium text-zinc-900">Include Weekly Draw (+50p per ticket)</div>
              <div className="text-sm text-zinc-500 mt-1 font-light">Enter the weekly draw for a chance to win {isHighRoller ? '£1,500' : '£500'}.</div>
            </div>
          </label>

          {/* Direct Debit */}
          <label className="flex items-start gap-4 p-5 border border-zinc-200 rounded-xl cursor-pointer hover:border-zinc-400 transition-colors bg-zinc-50 group">
            <div className="mt-0.5">
              <input 
                type="checkbox" 
                checked={directDebit} 
                onChange={(e) => setDirectDebit(e.target.checked)}
                className="w-5 h-5 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-900 accent-zinc-900"
              />
            </div>
            <div>
              <div className="font-medium text-zinc-900">Set up Direct Debit</div>
              <div className="text-sm text-zinc-600 mt-1 font-light">Receive <span className="font-medium">double tickets</span> on every future draw automatically.</div>
            </div>
          </label>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200">
          <div className="flex justify-between text-base mb-3">
            <span className="text-zinc-500 font-light">Total tickets allocated</span>
            <span className="font-medium text-zinc-900">{totalTickets}</span>
          </div>
          <div className="flex justify-between items-end mt-6">
            <span className="text-zinc-500 font-light mb-1">Total due today</span>
            <span className="font-light tracking-tight text-4xl text-zinc-950">£{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={handlePurchase}
          disabled={isSubmitting}
          className="w-full mt-10 py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing payment...' : 'Pay securely'}
        </button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
