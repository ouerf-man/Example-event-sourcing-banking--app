export interface GetAccountBalanceResponse {
    balance: number;
}

export interface GetAccountStatementResponse {
    statement: AccountStatementItem[];
}

export interface AccountStatementItem {
    date: string;
    amount: number;
    balance: number;
    type: string
}

export interface DepositRequest {
    accountId: string;
    amount: number;
}

export interface DepositResponse {
    transactionId: string;
    accountId: string;
    amount: number;
    type: 'Deposit';
    date: string;
    balanceAfter: number;
}

export interface WithdrawalRequest {
    accountId: string;
    amount: number;
}

export interface WithdrawalResponse {
    transactionId: string;
    accountId: string;
    amount: number;
    type: 'Withdrawal';
    date: string;
    balanceAfter: number;
}
