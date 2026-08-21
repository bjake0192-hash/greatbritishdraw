import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

async function login(formData: FormData) {
  'use server';
  const password = formData.get('password');
  if (password === 'admin123') {
    (await cookies()).set('admin_auth', 'true');
    revalidatePath('/admin');
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form action={login} className="bg-white p-10 rounded-3xl border-2 border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)] max-w-sm w-full">
          <h1 className="text-3xl font-serif font-black mb-8 text-center text-slate-900">Admin Login</h1>
          <input 
            type="password" 
            name="password" 
            placeholder="Enter Password" 
            className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors bg-slate-50 mb-8 text-slate-900 font-bold"
          />
          <button type="submit" className="w-full bg-slate-900 text-white font-bold text-lg p-4 rounded-xl hover:bg-slate-800 transition-colors">
            Unlock
          </button>
        </form>
      </div>
    );
  }

  // Fetch stats
  const draws = await prisma.draw.findMany({
    include: {
      tickets: true,
    }
  });

  const totalIncomeResult = await prisma.ticket.aggregate({
    _sum: {
      pricePaid: true
    }
  });
  const totalIncome = totalIncomeResult._sum.pricePaid || 0;

  return (
    <div className="min-h-screen p-8 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900">Admin Dashboard</h1>
          <div className="text-sm font-bold border-2 border-emerald-200 bg-emerald-50 text-emerald-800 px-6 py-3 rounded-full flex items-center gap-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Total Income: £{totalIncome.toFixed(2)}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {draws.map(draw => {
            const totalTickets = draw.tickets.length;
            const paidTickets = draw.tickets.filter(t => t.isPaid).length;
            const freeTickets = totalTickets - paidTickets;

            return (
              <div key={draw.id} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border-2 border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                <h2 className="text-2xl font-serif font-bold mb-1 text-slate-900">{draw.name}</h2>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Prize: £{draw.prize}</div>
                
                <div className="space-y-4 font-medium">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Tickets in Draw</span>
                    <span className="font-bold text-slate-900">{totalTickets}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Paid Tickets</span>
                    <span className="font-bold text-slate-900">{paidTickets}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Bonus/Free Tickets</span>
                    <span className="font-bold text-amber-500">{freeTickets}</span>
                  </div>
                </div>
              </div>
            );
          })}
          
          {draws.length === 0 && (
            <div className="col-span-2 text-center text-slate-500 font-bold py-24 bg-white rounded-3xl border-2 border-slate-200 border-dashed">
              No draws or tickets found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}