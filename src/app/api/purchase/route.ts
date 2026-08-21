import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, totalTickets, addWeekly, directDebit, totalPrice } = body;

    // Create a mock user for this transaction
    const user = await prisma.user.create({
      data: {
        email: `user_${Date.now()}@example.com`,
        directDebit,
      }
    });

    // Find or create the draws
    const mainDrawName = type === 'high-roller' ? 'High Roller Bi-Monthly' : 'Standard Monthly';
    let mainDraw = await prisma.draw.findFirst({ where: { name: mainDrawName } });
    if (!mainDraw) {
      mainDraw = await prisma.draw.create({
        data: {
          name: mainDrawName,
          type: type === 'high-roller' ? 'HIGH_ROLLER' : 'STANDARD',
          frequency: type === 'high-roller' ? 'BI_MONTHLY' : 'MONTHLY',
          date: new Date(), // Mock date
          prize: type === 'high-roller' ? 25000 : 10000,
        }
      });
    }

    let weeklyDraw = null;
    if (addWeekly) {
      const weeklyDrawName = type === 'high-roller' ? 'High Roller Weekly' : 'Standard Weekly';
      weeklyDraw = await prisma.draw.findFirst({ where: { name: weeklyDrawName } });
      if (!weeklyDraw) {
        weeklyDraw = await prisma.draw.create({
          data: {
            name: weeklyDrawName,
            type: type === 'high-roller' ? 'HIGH_ROLLER' : 'STANDARD',
            frequency: 'WEEKLY',
            date: new Date(), // Mock date
            prize: type === 'high-roller' ? 1500 : 500,
          }
        });
      }
    }

    // Insert tickets
    // We'll mark the total paid amount on the first ticket just for accounting ease, 
    // or distribute it. Let's just create tickets.
    const ticketsData = [];
    for (let i = 0; i < totalTickets; i++) {
      ticketsData.push({
        userId: user.id,
        drawId: mainDraw.id,
        isPaid: true,
        pricePaid: i === 0 ? totalPrice : 0, // Attach total transaction price to the first ticket for income stats
      });

      if (weeklyDraw) {
        ticketsData.push({
          userId: user.id,
          drawId: weeklyDraw.id,
          isPaid: true,
          pricePaid: 0, // the extra 50p is already included in totalPrice
        });
      }
    }

    await prisma.ticket.createMany({
      data: ticketsData
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process purchase' }, { status: 500 });
  }
}
