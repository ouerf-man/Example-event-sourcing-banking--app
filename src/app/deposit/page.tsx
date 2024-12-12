import React from 'react';
import { Typography, Layout } from '@/components';
import { DepositForm } from './DepositForm';

const DepositPage: React.FC = () => {
  const accountId = process.env.TEST_ACCOUNT_ID || "1";

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Deposit Money
      </Typography>
      <DepositForm accountId={accountId} />
    </Layout>
  );
};

export default DepositPage;
