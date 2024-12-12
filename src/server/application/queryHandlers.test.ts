// src/application/QueryHandlers.test.ts

import { mockDeep, MockProxy } from 'jest-mock-extended';
import { GetAccountBalanceQuery, GetAccountStatementQuery, QueryHandlers } from '.';
import { EventRepository } from '../infrastructure/EventRepository';



describe('QueryHandlers', () => {
  let queryHandlers: QueryHandlers;
  let eventRepo: MockProxy<EventRepository>;

  beforeEach(() => {
    eventRepo = mockDeep<EventRepository>();
    queryHandlers = new QueryHandlers(eventRepo);

    jest.clearAllMocks();
  });

  describe('handleGetAccountBalance', () => {
    it('should return the correct account balance', async () => {
      const balanceQuery: GetAccountBalanceQuery = {
        accountId: 'account-uuid',
      };

      eventRepo.getEvents.mockResolvedValue([
        {
          id: 'event-1',
          accountId: 'account-uuid',
          type: 'Deposit',
          payload: { amount: 500 },
          createdAt: new Date('2024-12-12T12:00:00Z'),
          sequence: 1,
        },
        {
          id: 'event-2',
          accountId: 'account-uuid',
          type: 'Withdraw',
          payload: { amount: 200 },
          createdAt: new Date('2024-12-13T12:00:00Z'),
          sequence: 2,
        },
      ]);

      const balance = await queryHandlers.handleGetAccountBalance(balanceQuery);

      expect(balance).toBe(300);
    });

  });

  describe('handleGetAccountStatement', () => {
    it('should return the correct account statement', async () => {
      const statementQuery: GetAccountStatementQuery = {
        accountId: 'account-uuid',
      };

      // Mock events retrieval
      eventRepo.getEvents.mockResolvedValue([
        {
          id: 'event-1',
          accountId: 'account-uuid',
          type: 'Deposit',
          payload: { amount: 500 },
          createdAt: new Date('2024-12-12T12:00:00Z'),
          sequence: 1,
        },
        {
          id: 'event-2',
          accountId: 'account-uuid',
          type: 'Withdraw',
          payload: { amount: 200 },
          createdAt: new Date('2024-12-13T12:00:00Z'),
          sequence: 2,
        },
      ]);

      const statement = await queryHandlers.handleGetAccountStatement(statementQuery);

      expect(eventRepo.getEvents).toHaveBeenCalledWith('account-uuid');

      expect(statement).toEqual([
        {
          date: new Date('2024-12-13T12:00:00Z').toISOString(),
          amount: -200,
          balance: 300,
          type: "Withdraw"
        },
        {
          date: new Date('2024-12-12T12:00:00Z').toISOString(),
          amount: 500,
          balance: 500,
          type: "Deposit"
        },
      ]);
    });

    it('should handle empty event list', async () => {
      const statementQuery: GetAccountStatementQuery = {
        accountId: 'account-uuid',
      };

      eventRepo.getEvents.mockResolvedValue([]); // No events

      const statement = await queryHandlers.handleGetAccountStatement(statementQuery);

      expect(eventRepo.getEvents).toHaveBeenCalledWith('account-uuid');

      expect(statement).toEqual([]);
    });

    it('should ignore unknown event types', async () => {
      const statementQuery: GetAccountStatementQuery = {
        accountId: 'account-uuid',
      };

      eventRepo.getEvents.mockResolvedValue([
        {
          id: 'event-1',
          accountId: 'account-uuid',
          type: 'Deposit',
          payload: { amount: 500 },
          createdAt: new Date('2024-12-12T12:00:00Z'),
          sequence: 1,
        },
        {
          id: 'event-2',
          accountId: 'account-uuid',
          type: 'UnknownEvent',
          payload: {},
          createdAt: new Date('2024-12-13T12:00:00Z'),
          sequence: 2,
        },
      ]);

      const statement = await queryHandlers.handleGetAccountStatement(statementQuery);

      expect(eventRepo.getEvents).toHaveBeenCalledWith('account-uuid');

      expect(statement).toEqual([
        {
          date: new Date('2024-12-12T12:00:00Z').toISOString(),
          amount: 500,
          balance: 500,
          type: 'Deposit',
        },
      ]);
    });

    it('should correctly calculate balance with multiple events', async () => {
      const statementQuery: GetAccountStatementQuery = {
        accountId: 'account-uuid',
      };

      eventRepo.getEvents.mockResolvedValue([
        {
          id: 'event-1',
          accountId: 'account-uuid',
          type: 'Deposit',
          payload: { amount: 1000 },
          createdAt: new Date('2024-01-01T10:00:00Z'),
          sequence: 1,
        },
        {
          id: 'event-2',
          accountId: 'account-uuid',
          type: 'Withdraw',
          payload: { amount: 300 },
          createdAt: new Date('2024-01-02T10:00:00Z'),
          sequence: 2,
        },
        {
          id: 'event-3',
          accountId: 'account-uuid',
          type: 'Transfer',
          payload: { amount: 200, toIban: 'DE89370400440532013000' },
          createdAt: new Date('2024-01-03T10:00:00Z'),
          sequence: 3,
        },
      ]);

      const statement = await queryHandlers.handleGetAccountStatement(statementQuery);
      expect(eventRepo.getEvents).toHaveBeenCalledWith('account-uuid');

      expect(statement).toEqual([
        {
          date: new Date('2024-01-03T10:00:00Z').toISOString(),
          amount: -200,
          balance: 500,
          type:"Transfer"
        },
        {
          date: new Date('2024-01-02T10:00:00Z').toISOString(),
          amount: -300,
          balance: 700,
          type:"Withdraw"
        },
        {
          date: new Date('2024-01-01T10:00:00Z').toISOString(),
          amount: 1000,
          balance: 1000,
          type:"Deposit"
        },
      ]);
    });
  });
});
