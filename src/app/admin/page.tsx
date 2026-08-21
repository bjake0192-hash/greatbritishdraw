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
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <form action={login} className="bg-white p-10 rounded-2xl border border-zinc-200 shadow-sm max-w-sm w-full">
          <h1 className="text-2xl font-serif mb-8 text-center text-zinc-900">Admin Login</h1>
          <input 
            type="password" 
            name="password" 
            placeholder="Enter Password" 
            className="w-full p-3 border-b-2 border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors bg-transparent rounded-none mb-8 text-zinc-900"
          />
          <button type="submit" className="w-full bg-zinc-950 text-white font-medium p-3 rounded-lg hover:bg-zinc-800 transition-colors">
            Login
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
    <div className="min-h-screen bg-[#fafafa] p-8 text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      <div className="max-w-5xl mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <h1 className="text-4xl font-serif text-zinc-950">Admin Dashboard</h1>
          <div className="text-sm font-medium border border-emerald-200 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Total Income: £{totalIncome.toFixed(2)}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {draws.map(draw => {
            const totalTickets = draw.tickets.length;
            const paidTickets = draw.tickets.filter(t => t.isPaid).length;
            const freeTickets = totalTickets - paidTickets;

            return (
              <div key={draw.id} className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
                <h2 className="text-2xl font-serif mb-1 text-zinc-900">{draw.name}</h2>
                <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-8">Prize: £{draw.prize}</div>
                
                <div className="space-y-4">
                  <div className="flex justify-between font-light text-zinc-600">
                    <span>Total Tickets in Draw</span>
                    <span className="font-medium text-zinc-900">{totalTickets}</span>
                  </div>
                  <div className="flex justify-between font-light text-zinc-600">
                    <span>Paid Tickets</span>
                    <span className="font-medium text-zinc-900">{paidTickets}</span>
                  </div>
                  <div className="flex justify-between font-light text-zinc-600">
                    <span>Bonus/Free Tickets</span>
                    <span className="font-medium text-emerald-600">{freeTickets}</span>
                  </div>
                </div>
              </div>
            );
          })}
          
          {draws.length === 0 && (
            <div className="col-span-2 text-center text-zinc-500 font-light py-24 bg-white rounded-2xl border border-zinc-200 border-dashed">
              No draws or tickets found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
