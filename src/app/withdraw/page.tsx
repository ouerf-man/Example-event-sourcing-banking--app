import React from 'react';
import { Typography, Layout } from '@/components';
import { WithdrawForm } from './WithdrawForm';

const WithdrawPage: React.FC = () => {
  const accountId = process.env.TEST_ACCOUNT_ID || "1";

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Withdraw Money
      </Typography>
      <WithdrawForm 
        accountId={accountId}
      />
    </Layout>
  );
};

export default WithdrawPage;
