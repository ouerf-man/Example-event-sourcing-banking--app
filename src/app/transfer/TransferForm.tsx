'use client';

import React, { useState } from 'react';
import { Form } from '@/components';
import { useMakeTransfer } from '../../hooks';
import { validateIBAN } from '../../lib/utils';

type TransferFormProps = {
  accountId: string,
}
export const TransferForm: React.FC<TransferFormProps> = ({ accountId, }) => {
  const [amount, setAmount] = useState<string>('');
  const [toIban, setToIban] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const { transfer, error, loading } = useMakeTransfer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!validateIBAN(toIban)){
      setErrorMessage('Please enter a valid IBAN.');
      return;
    }
    // Input validation
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Please enter a valid positive amount.');
      return;
    }

    try {
      await transfer({
        fromAccountId: accountId,
        toIban: toIban,
        amount: parsedAmount,
      });;
      setMessage('Transfer successful!');
    } catch (err: unknown) {
      console.error(err)
      setErrorMessage('An unexpected error occurred.');

    }
  };
  const formFields = [
    
    {
      label: 'Iban',
      type: 'text',
      value: toIban,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setToIban(e.target.value),
      required: true,
    },
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
      submitLabel="Transfert"
      loading={loading}
      successMessage={message}
      errorMessage={errorMessage || error || ""}
    />
  );
};

