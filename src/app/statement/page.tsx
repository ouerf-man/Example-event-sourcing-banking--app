import React from 'react';
import { Typography, Layout } from '@/components';
import { StatementsTable } from './StatementsTable';

const StatementPage: React.FC = () => {
  const accountId = process.env.TEST_ACCOUNT_ID || "1";
  return (
    <Layout>
      <StatementsTable
        accountId={accountId}
      />
    </Layout>
  );
};

export default StatementPage;
