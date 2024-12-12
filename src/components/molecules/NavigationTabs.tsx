'use client';

import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

export const NavigationTabs: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
  };

  const currentTab = pathname.startsWith('/deposit')
    ? '/deposit'
    : pathname.startsWith('/withdraw')
    ? '/withdraw'
    : pathname.startsWith('/transfer')
    ? '/transfer'
    : pathname.startsWith('/statement')
    ? '/statement'
    : '/';

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
      <Tabs value={currentTab} onChange={handleChange} variant="fullWidth">
        <Tab label="Dashboard" value="/" />
        <Tab label="Deposit" value="/deposit" />
        <Tab label="Withdraw" value="/withdraw" />
        <Tab label="Transfer" value="/transfer" />
        <Tab label="Statement" value="/statement" />
      </Tabs>
    </Box>
  );
};
