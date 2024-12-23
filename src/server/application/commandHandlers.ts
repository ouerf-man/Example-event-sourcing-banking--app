import { PrismaClient } from '@prisma/client';
import { validateIBAN } from '../../lib/utils';
import { DepositCommand, WithdrawCommand, TransferCommand, EVENT_TYPES } from '../domain';
import { EventRepository } from '../infrastructure';

export class CommandHandlers {
  constructor(private eventRepo: EventRepository, private prisma: PrismaClient) {}

  async handleDeposit(command: DepositCommand): Promise<void> {
    // Create Deposit Event
    const event = {
      id: crypto.randomUUID(),
      accountId: command.accountId,
      type: EVENT_TYPES.DEPOSIT,
      payload: { amount: command.amount },
    };

    await this.eventRepo.append(event);
  }

  async handleWithdraw(command: WithdrawCommand): Promise<void> {
    // Load current balance
    const account = await this.prisma.account.findUnique({
      where: { id: command.accountId },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    // Create Withdraw Event
    const event = {
      id: crypto.randomUUID(),
      accountId: command.accountId,
      type: EVENT_TYPES.WITHDRAW,
      payload: { amount: command.amount },
    };

    await this.eventRepo.append(event);
  }

  async handleTransfer(command: TransferCommand): Promise<void> {
    // Validate IBAN
    if (!validateIBAN(command.toIban)) {
      throw new Error('Invalid IBAN');
    }

    // Load sender account
    const sender = await this.prisma.account.findUnique({
      where: { id: command.fromAccountId },
    });

    if (!sender) {
      throw new Error('Sender account not found');
    }


    // Create Transfer Event for Sender
    const transferOutEvent = {
      id: crypto.randomUUID(),
      accountId: command.fromAccountId,
      type: EVENT_TYPES.TRANSFER,
      payload: { amount: command.amount, toIban: command.toIban },
    };

    // Append both events
    await this.eventRepo.append(transferOutEvent);
  }

  
}
