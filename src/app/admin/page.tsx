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
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <form action={login} className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Admin Login</h1>
          <input 
            type="password" 
            name="password" 
            placeholder="Enter Password" 
            className="w-full p-3 border rounded-lg mb-4 text-slate-800"
          />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold p-3 rounded-lg hover:bg-blue-700">
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
    <div className="min-h-screen bg-slate-50 p-8 text-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black text-slate-900">Admin Dashboard</h1>
          <div className="text-xl font-bold bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            Total Income: £{totalIncome.toFixed(2)}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {draws.map(draw => {
            const totalTickets = draw.tickets.length;
            const paidTickets = draw.tickets.filter(t => t.isPaid).length;
            const freeTickets = totalTickets - paidTickets;

            return (
              <div key={draw.id} className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-blue-500">
                <h2 className="text-2xl font-bold mb-2">{draw.name}</h2>
                <div className="text-sm text-slate-500 mb-6">Prize: £{draw.prize}</div>
                
                <div className="space-y-3">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-600">Total Tickets in Draw:</span>
                    <span className="font-bold text-lg">{totalTickets}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-600">Paid Tickets:</span>
                    <span className="font-bold text-lg text-blue-600">{paidTickets}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-600">Bonus/Free Tickets:</span>
                    <span className="font-bold text-lg text-green-600">{freeTickets}</span>
                  </div>
                </div>
              </div>
            );
          })}
          
          {draws.length === 0 && (
            <div className="col-span-2 text-center text-slate-500 py-12">
              No draws or tickets found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
