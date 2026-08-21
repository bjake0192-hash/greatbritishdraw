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
      alert('Purchase successful! Good luck!');
      window.location.href = '/';
    } catch (e) {
      alert('Purchase failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 md:py-24 px-6 text-slate-900">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden">
        
        {/* Ticket Header */}
        <div className={`p-8 md:p-12 text-white ${isHighRoller ? 'bg-slate-900' : 'bg-blue-600'}`}>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl md:text-4xl font-serif font-black">
              {isHighRoller ? 'High Roller' : 'Monthly Draw'}
            </h1>
            <Link href="/" className="text-sm font-bold opacity-80 hover:opacity-100 transition-opacity">Cancel</Link>
          </div>
          <p className="font-medium opacity-90">Admit One (or twenty!)</p>
        </div>

        {/* Ticket Body */}
        <div className="p-8 md:p-12">
          <div className="space-y-8">
            {/* Ticket Count */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Number of tickets</label>
              <input 
                type="number" 
                min="1" 
                value={ticketCount} 
                onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-4xl font-black p-4 border-b-4 border-slate-200 focus:border-amber-400 focus:outline-none transition-colors bg-transparent rounded-none"
              />
              {isBuy10Offer && (
                <p className="text-amber-600 font-bold mt-3 text-sm flex items-center gap-2">
                  🎪 Volume offer applied: Tickets doubled!
                </p>
              )}
            </div>

            {/* Add Weekly */}
            <label className="flex items-start gap-4 p-5 border-2 border-slate-200 rounded-2xl cursor-pointer hover:border-amber-400 transition-colors group">
              <div className="mt-0.5">
                <input 
                  type="checkbox" 
                  checked={addWeekly} 
                  onChange={(e) => setAddWeekly(e.target.checked)}
                  className="w-6 h-6 text-amber-500 border-slate-300 rounded focus:ring-amber-500 accent-amber-500"
                />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-lg">Include Weekly Draw (+50p)</div>
                <div className="text-sm text-slate-600 mt-1 font-medium">Enter the weekly draw for a chance to win {isHighRoller ? '£1,500' : '£500'}.</div>
              </div>
            </label>

            {/* Direct Debit */}
            <label className="flex items-start gap-4 p-5 border-2 border-slate-200 rounded-2xl cursor-pointer hover:border-amber-400 transition-colors bg-slate-50 group">
              <div className="mt-0.5">
                <input 
                  type="checkbox" 
                  checked={directDebit} 
                  onChange={(e) => setDirectDebit(e.target.checked)}
                  className="w-6 h-6 text-amber-500 border-slate-300 rounded focus:ring-amber-500 accent-amber-500"
                />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-lg">Set up Direct Debit</div>
                <div className="text-sm text-slate-600 mt-1 font-medium">Receive <span className="font-bold text-amber-600">double tickets</span> on every future draw automatically.</div>
              </div>
            </label>
          </div>

          <div className="mt-12 pt-8 border-t-4 border-dashed border-slate-200">
            <div className="flex justify-between text-lg mb-2 font-bold">
              <span className="text-slate-500">Total tickets allocated</span>
              <span className="text-slate-900">{totalTickets}</span>
            </div>
            <div className="flex justify-between items-end mt-4">
              <span className="text-slate-500 font-bold mb-1">Total due today</span>
              <span className="font-black tracking-tight text-5xl text-slate-900">£{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={handlePurchase}
            disabled={isSubmitting}
            className={`w-full mt-10 py-5 text-white rounded-2xl font-black text-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${isHighRoller ? 'bg-red-600 hover:bg-red-700 shadow-red-900/30' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/30'}`}
          >
            {isSubmitting ? 'Processing...' : 'Pay Securely'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-bold">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}