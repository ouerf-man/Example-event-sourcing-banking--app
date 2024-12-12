'use client';

import React, { useState } from 'react';
import { Form } from '@/components';
import { useMakeWithdrawal } from '../../hooks';

type WithdrawFormProps = {
    accountId:string
}
export const WithdrawForm: React.FC<WithdrawFormProps> = ({accountId}) => {
  const [amount, setAmount] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const { withdraw, loading, error } = useMakeWithdrawal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage('Please enter a valid positive amount.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      await withdraw({
        accountId,
        amount: parsedAmount,
      });;
      setStatus('success');
      setMessage('Withdraw successful!');
      setAmount('');
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage(err.message || 'An unexpected error occurred.');
      }
      setStatus('error');
    }
  };

  const formFields = [
    {
      label: 'Amount',
      type: 'number',
      value: amount,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value),
      required: true,
      min: '0.01',
      step: '0.01',
    },
  ];

  return (
    <Form
      fields={formFields}
      onSubmit={handleSubmit}
      submitLabel="Withdraw"
      loading={status === 'loading'}
      successMessage={status === 'success' ? message : undefined}
      errorMessage={status === 'error' ? message : undefined}
    />
  );
};

