export interface DepositCommand {
    accountId: string;
    amount: number;
}

export interface WithdrawCommand {
    accountId: string;
    amount: number;
}

export interface TransferCommand {
    fromAccountId: string;
    toIban: string;
    amount: number;
}
