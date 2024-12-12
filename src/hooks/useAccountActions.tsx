

import { DepositResponse, WithdrawalRequest, WithdrawalResponse } from "../lib/types";
import { DepositRequest } from "../lib/types";
import { makeDeposit, makeWithdrawal } from "../lib/apiService";
import { toast } from 'react-toastify';
import { useState } from "react";

export const useDeposit = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deposit = async (request: DepositRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await makeDeposit(request);
      if (response.error) {
        toast.error(`Deposit failed`);
      }else{
        toast.success(`Deposited $${request.amount} successfully!`);
      }
    } catch (err) {
      setError((err as Error).message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { deposit, loading, error };
};

export const useMakeWithdrawal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const withdraw = async (request: WithdrawalRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await makeWithdrawal(request);
      if (response.error) {
        toast.error(`Withdrawal failed`);
      } else if (response.data) {
          toast.success(`Withdrew $${request.amount} successfully!`);
        
      }
    } catch (err) {
      setError((err as Error).message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { withdraw, loading, error };
};
