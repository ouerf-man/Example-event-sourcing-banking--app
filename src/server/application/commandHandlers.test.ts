// src/application/CommandHandlers.test.ts

import { mockDeep, MockProxy } from 'jest-mock-extended';
import { CommandHandlers } from '.';
import { EventRepository } from '../infrastructure/EventRepository';
import { EVENT_TYPES } from '../domain/events/EventTypes';

// Mock the Prisma Client   
jest.mock('../infrastructure/prismaClient');

import { prismaMock } from '../infrastructure/__mocks__/prismaClient';
import { DepositCommand, TransferCommand, WithdrawCommand } from '../domain/commands/types';


describe('CommandHandlers', () => {
  let commandHandlers: CommandHandlers;
  let eventRepo: MockProxy<EventRepository>;

  beforeEach(() => {
    eventRepo = mockDeep<EventRepository>();
    commandHandlers = new CommandHandlers(eventRepo, prismaMock);

    jest.clearAllMocks();
  });

  describe('handleDeposit', () => {
    it('should append a deposit event to the event repository', async () => {
      const depositCommand: DepositCommand = {
        accountId: 'test-account-id',
        amount: 100,
      };

      await commandHandlers.handleDeposit(depositCommand);

      expect(eventRepo.append).toHaveBeenCalledWith(expect.objectContaining({
        accountId: depositCommand.accountId,
        type: EVENT_TYPES.DEPOSIT,
        payload: { amount: depositCommand.amount },
      }));
    });
  });

  describe('handleWithdraw', () => {
    it('should throw an error if the account is not found', async () => {
      prismaMock.account.findUnique.mockResolvedValue(null);

      const withdrawCommand: WithdrawCommand = {
        accountId: 'non-existent-account',
        amount: 50,
      };

      await expect(commandHandlers.handleWithdraw(withdrawCommand)).rejects.toThrow('Account not found');
    });

    it('should append a withdraw event to the event repository', async () => {
      prismaMock.account.findUnique.mockResolvedValue({
        id: 'test-account-id',
        iban: "TN3226598",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const withdrawCommand: WithdrawCommand = {
        accountId: 'test-account-id',
        amount: 50,
      };

      await commandHandlers.handleWithdraw(withdrawCommand);

      expect(eventRepo.append).toHaveBeenCalledWith(expect.objectContaining({
        accountId: withdrawCommand.accountId,
        type: EVENT_TYPES.WITHDRAW,
        payload: { amount: withdrawCommand.amount },
      }));
    });
  });

  describe('handleTransfer', () => {
    it('should throw an error for invalid IBAN', async () => {
      const transferCommand: TransferCommand = {
        fromAccountId: 'sender-account-id',
        toIban: 'invalid-iban',
        amount: 200,
      };

      await expect(commandHandlers.handleTransfer(transferCommand)).rejects.toThrow('Invalid IBAN');
    });

    it('should throw an error if the sender account is not found', async () => {
      prismaMock.account.findUnique.mockResolvedValue(null);

      const transferCommand: TransferCommand = {
        fromAccountId: 'non-existent-account',
        toIban: 'DE89370400440532013000',
        amount: 200,
      };

      await expect(commandHandlers.handleTransfer(transferCommand)).rejects.toThrow('Sender account not found');
    });

    it('should append a transfer event to the event repository', async () => {
      prismaMock.account.findUnique.mockResolvedValue({
        id: 'sender-account-id',
        iban: "TN3226598",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const transferCommand: TransferCommand = {
        fromAccountId: 'sender-account-id',
        toIban: 'DE89370400440532013000',
        amount: 200,
      };

      await commandHandlers.handleTransfer(transferCommand);

      expect(eventRepo.append).toHaveBeenCalledWith(expect.objectContaining({
        accountId: transferCommand.fromAccountId,
        type: EVENT_TYPES.TRANSFER,
        payload: { amount: transferCommand.amount, toIban: transferCommand.toIban },
      }));
    });
  });
});