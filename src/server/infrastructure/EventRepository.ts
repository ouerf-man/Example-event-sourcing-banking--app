import { Event } from '../domain';
import { prisma } from './prismaClient';


export class EventRepository {
  async append(event: Omit<Event, 'sequence' | 'createdAt'>): Promise<void> {
    const lastEvent = await prisma.event.findFirst({
      where: { accountId: event.accountId },
      orderBy: { sequence: 'desc' },
    });

    const sequence = lastEvent ? lastEvent.sequence + 1 : 1;

    await prisma.event.create({
      data: {
        ...event,
        sequence,
      },
    });
  }

  async getEvents(accountId: string): Promise<Event[]> {
    return prisma.event.findMany({
      where: { accountId },
      orderBy: { sequence: 'asc' },
    });
  }
}
