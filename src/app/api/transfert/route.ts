import { NextResponse } from 'next/server';
import { CommandHandlers } from '@/server/application';
import { EventRepository } from '@/server/infrastructure';

export async function POST(request: Request) {
    const { fromAccountId, toIban, amount } = await request.json();

    if (!fromAccountId || !toIban || !amount) {
        return NextResponse.json({ error: 'Missing fromAccountId, toIban, or amount' }, { status: 400 });
    }

  const eventRepo = new EventRepository();
  const commandHandlers = new CommandHandlers(eventRepo);


  try {
    await commandHandlers.handleTransfer({ fromAccountId, toIban, amount });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
