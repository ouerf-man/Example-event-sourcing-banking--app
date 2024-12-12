import React from 'react';
import {Typography, Alert, Layout} from '@/components';
import { getAccountBalance } from '../lib';

const DashboardPage: React.FC = async () => {
  const accountId = "1";

  try {
    const response = await getAccountBalance(accountId);
    return (
      <Layout>
        <Typography color='black' variant="h5">Current Balance: ${response.data.balance}</Typography>
      </Layout>
    );
  } catch (err: any) {
    return (
      <Layout>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Alert severity="error">{err.message || 'Failed to fetch balance.'}</Alert>
      </Layout>
    );
  }
};

export default DashboardPage;
