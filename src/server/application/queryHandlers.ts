import { AccountStatementItem } from '@/lib/types';
import { EventRepository } from '../infrastructure';

export interface GetAccountStatementQuery {
  accountId: string;
}

export interface GetAccountBalanceQuery {
  accountId: string;
}

export class QueryHandlers {
  constructor(private eventRepo: EventRepository) { }

  async handleGetAccountStatement(query: GetAccountStatementQuery): Promise<AccountStatementItem[]> {
    const events = await this.eventRepo.getEvents(query.accountId);

    // Reconstruct balance and statement
    let balance = 0;
    const statement = events
      .map((event) => {
        switch (event.type) {
          case 'Deposit':
            balance += event.payload.amount;
            return {
              date: event.createdAt.toISOString(),
              amount: event.payload.amount,
              balance,
              type: "Deposit"
            } as AccountStatementItem;
          case 'Withdraw':
            balance -= event.payload.amount;
            return {
              date: event.createdAt.toISOString(),
              amount: -event.payload.amount,
              balance,
              type: "Withdraw"
            } as AccountStatementItem;
          case 'Transfer':
            balance += event.payload.amount;
            return {
              date: event.createdAt.toISOString(),
              amount: event.payload.amount,
              balance,
              type: "Transfer"
            } as AccountStatementItem;
          default:
            return null;
        }
      })
      .filter((item): item is AccountStatementItem => item !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return statement;
  }

  async handleGetAccountBalance(query: GetAccountBalanceQuery): Promise<number> {
    const events = await this.eventRepo.getEvents(query.accountId);

    let balance = 0;
    events.forEach((event) => {
      switch (event.type) {
        case 'Deposit':
          balance += event.payload.amount;
          break;
        case 'Withdraw':
          balance -= event.payload.amount;
          break;
        case 'TransferOut':
          balance -= event.payload.amount;
          break;
        case 'TransferIn':
          balance += event.payload.amount;
          break;
        default:
          break;
      }
    });

    return balance;
  }
}
