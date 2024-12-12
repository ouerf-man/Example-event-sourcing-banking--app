import { NextResponse } from 'next/server';
import { CommandHandlers } from '@/server/application';
import { EventRepository, prisma } from '@/server/infrastructure';

export async function POST(request: Request) {
  const { accountId, amount } = await request.json();
  if (!accountId || !amount) {
    return NextResponse.json({ error: 'Missing accountId or amount' }, { status: 400 });
  }

  const eventRepo = new EventRepository();
  const commandHandlers = new CommandHandlers(eventRepo, prisma);


  try {
    await commandHandlers.handleWithdraw({ accountId, amount });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
