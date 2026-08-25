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
      alert('Order placed successfully! Thank you.');
      window.location.href = '/';
    } catch (e) {
      alert('Purchase failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto py-8 px-4 w-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-medium">Checkout ({ticketCount} items)</h1>
        <Link href="/" className="text-[#007185] hover:text-[#c45500] hover:underline text-sm">Cancel & Return to Basket</Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Configuration */}
        <div className="flex-1 space-y-4">
          <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4">1. Configure your tickets</h2>
            
            <div className="mb-6 pb-6 border-b border-gray-200">
              <label className="block text-sm font-bold mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  min="1" 
                  value={ticketCount} 
                  onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 p-2 border border-gray-300 rounded shadow-inner text-lg focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] outline-none"
                />
                {isBuy10Offer && (
                  <span className="text-green-700 font-bold text-sm bg-green-50 px-2 py-1 border border-green-200 rounded">Volume Offer Applied: Tickets Doubled</span>
                )}
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">2. Additional Options</h2>
            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={addWeekly} 
                  onChange={(e) => setAddWeekly(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#e77600] border-gray-300 rounded focus:ring-[#e77600]"
                />
                <div>
                  <div className="font-bold">Include Weekly Draw (+£0.50 per ticket)</div>
                  <div className="text-sm text-gray-600">Enter the weekly draw for a chance to win {isHighRoller ? '£1,500' : '£500'}.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={directDebit} 
                  onChange={(e) => setDirectDebit(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#e77600] border-gray-300 rounded focus:ring-[#e77600]"
                />
                <div>
                  <div className="font-bold">Subscribe with Direct Debit</div>
                  <div className="text-sm text-gray-600">Receive double tickets on every future draw automatically. Cancel anytime.</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-80">
          <div className="bg-white p-5 rounded shadow-sm border border-gray-200 mb-4 sticky top-4">
            <button 
              onClick={handlePurchase}
              disabled={isSubmitting}
              className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] text-black font-medium py-2 rounded-full shadow-sm mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Place your order'}
            </button>
            
            <div className="text-center text-xs text-gray-600 mb-4 pb-4 border-b border-gray-200">
              By placing your order, you agree to our <span className="text-[#007185] hover:underline cursor-pointer">privacy notice</span> and <span className="text-[#007185] hover:underline cursor-pointer">conditions of use</span>.
            </div>

            <h3 className="font-bold text-lg mb-2">Order Summary</h3>
            <div className="space-y-1 text-sm mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between">
                <span>Items ({ticketCount}):</span>
                <span>£{(ticketCount * basePrice).toFixed(2)}</span>
              </div>
              {addWeekly && (
                <div className="flex justify-between">
                  <span>Weekly Add-on:</span>
                  <span>£{(ticketCount * weeklyAddOnPrice).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-green-700">
                <span>Total Tickets Granted:</span>
                <span className="font-bold">{totalTickets}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-xl text-red-700 mb-4">
              <span>Order Total:</span>
              <span>£{totalPrice.toFixed(2)}</span>
            </div>

            <div className="bg-gray-100 p-3 rounded text-xs text-gray-600">
              <span className="font-bold text-gray-800">Secure Checkout</span><br/>
              Your transaction is encrypted and securely processed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-bold">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}