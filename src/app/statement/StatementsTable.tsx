import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { getAccountStatement } from '../../lib';
import { AccountStatementItem } from '../../lib/types';

type StatementsTableProps = {
  accountId: string;
}

export const StatementsTable: React.FC<StatementsTableProps> = async ({ accountId }) => {

  try {
    const { data: { statement } } = await getAccountStatement(accountId);

    if (statement.length === 0) {
      return (
        <Box my={4}>
          <Typography>No transactions found.</Typography>
        </Box>
      );
    }

    return (
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount ($)</TableCell>
              <TableCell align="right">Balance After ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statement.map((tx: AccountStatementItem) => (
              <TableRow key={tx.date}>
                <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell align="right" sx={{ color: tx.type === 'Deposit' ? 'green' : 'red' }}>
                  {tx.amount >= 0 ? `+${tx.amount.toFixed(2)}` : `${tx.amount.toFixed(2)}`}
                </TableCell>
                <TableCell align="right">{tx.balance.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

  }

  catch (err) {
    return (
      <Box my={4}>
        <Typography color="error">Error occurred</Typography>
      </Box>
    );
  }

};