import { NextResponse } from 'next/server';
import { CommandHandlers } from '@/server/application';
import { EventRepository } from '@/server/infrastructure';

export async function POST(request: Request) {
  const { accountId, amount } = await request.json();
  if (!accountId || !amount) {
    return NextResponse.json({ error: 'Missing accountId or amount' }, { status: 400 });
  }

  const eventRepo = new EventRepository();
  const commandHandlers = new CommandHandlers(eventRepo);


  try {
    await commandHandlers.handleDeposit({ accountId, amount });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
