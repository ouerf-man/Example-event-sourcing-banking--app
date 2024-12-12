// src/api/accountService.ts

import { apiClient, ApiResponse } from './apiClient';
import {
  DepositRequest,
  DepositResponse,
  GetAccountBalanceResponse,
  GetAccountStatementResponse,
  TransferRequest,
  TransferResponse,
  WithdrawalRequest,
  WithdrawalResponse,
} from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAccountBalance = async (
  accountId: string
): Promise<ApiResponse<GetAccountBalanceResponse>> => {
  return await apiClient<GetAccountBalanceResponse>(
    `${BASE_URL}/balance?accountId=${accountId}`,
    {
      method: 'GET',
    }
  );
};

export const getAccountStatement = (
  accountId: string
): Promise<ApiResponse<GetAccountStatementResponse>> => {
  return apiClient<GetAccountStatementResponse>(
    `${BASE_URL}/statement?accountId=${accountId}`,
    {
      method: 'GET',
    }
  );
};

export const makeDeposit = (
  request: DepositRequest
): Promise<ApiResponse<DepositResponse>> => {
  return apiClient<DepositResponse>(
    `${BASE_URL}/deposit`,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );
};

export const makeWithdrawal = (
  request: WithdrawalRequest
): Promise<ApiResponse<WithdrawalResponse>> => {
  return apiClient<WithdrawalResponse>(
    `${BASE_URL}/withdraw`,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );
};

export const makeTransfer = (
  request: TransferRequest
): Promise<ApiResponse<TransferResponse>> => {
  return apiClient<TransferResponse>(
    `${BASE_URL}/transfert`,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );
};