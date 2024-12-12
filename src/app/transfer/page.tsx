import React from 'react';
import { Typography, Layout } from '@/components';
import { TransferForm } from './TransferForm';

const TransferPage: React.FC = () => {
  const accountId = process.env.TEST_ACCOUNT_ID || "1";

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Transfer Money
      </Typography>
      <TransferForm 
        accountId={accountId}
      />
    </Layout>
  );
};

export default TransferPage;
