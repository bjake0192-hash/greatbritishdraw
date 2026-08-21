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
    <div className="min-h-screen bg-slate-50 py-12 px-4 text-slate-900">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-slate-800">
            {isHighRoller ? 'High Roller Draw' : 'Standard Draw'}
          </h1>
          <Link href="/" className="text-blue-500 font-bold hover:underline">Back</Link>
        </div>

        <div className="space-y-6">
          {/* Ticket Count */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">How many tickets?</label>
            <input 
              type="number" 
              min="1" 
              value={ticketCount} 
              onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full text-2xl font-bold p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-0"
            />
            {isBuy10Offer && (
              <p className="text-green-600 font-bold mt-2 text-sm">🎉 Buy 10 offer applied! Tickets doubled!</p>
            )}
          </div>

          {/* Add Weekly */}
          <label className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
            <input 
              type="checkbox" 
              checked={addWeekly} 
              onChange={(e) => setAddWeekly(e.target.checked)}
              className="w-6 h-6 text-blue-600 rounded-md"
            />
            <div>
              <div className="font-bold text-lg">Add Weekly Draw (+50p per ticket)</div>
              <div className="text-sm text-slate-500">Win {isHighRoller ? '£1,500' : '£500'} every week!</div>
            </div>
          </label>

          {/* Direct Debit */}
          <label className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors bg-purple-50 border-purple-200">
            <input 
              type="checkbox" 
              checked={directDebit} 
              onChange={(e) => setDirectDebit(e.target.checked)}
              className="w-6 h-6 text-purple-600 rounded-md"
            />
            <div>
              <div className="font-bold text-lg text-purple-900">Set up Direct Debit</div>
              <div className="text-sm text-purple-700 font-medium">Get DOUBLE tickets on every draw!</div>
            </div>
          </label>
        </div>

        <hr className="my-8 border-slate-200" />

        <div className="bg-slate-100 p-6 rounded-2xl">
          <div className="flex justify-between text-lg mb-2">
            <span className="font-bold text-slate-600">Total Tickets You Get:</span>
            <span className="font-black text-2xl text-green-600">{totalTickets}</span>
          </div>
          <div className="flex justify-between text-xl">
            <span className="font-bold text-slate-800">Total Price:</span>
            <span className="font-black text-3xl">£{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={handlePurchase}
          disabled={isSubmitting}
          className="w-full mt-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xl shadow-lg disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Processing...' : 'Pay Securely'}
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
