'use client';

import React, { useState } from 'react';
import { Form } from '@/components';
import { useDeposit } from '../../hooks';


type StatementsTableProps = {
  accountId: string;
}

export const DepositForm: React.FC<StatementsTableProps> = ({ accountId }) => {
  const [amount, setAmount] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const { deposit } = useDeposit();

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
      await deposit({
        accountId,
        amount: parsedAmount,
      });;
      setStatus('success');
      setMessage('Deposit successful!');
      setAmount('');
    } catch (err: unknown) {
      console.error(err)
      setMessage('An unexpected error occurred.');

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
      submitLabel="Deposit"
      loading={status === 'loading'}
      successMessage={status === 'success' ? message : undefined}
      errorMessage={status === 'error' ? message : undefined}
    />
  );
};

