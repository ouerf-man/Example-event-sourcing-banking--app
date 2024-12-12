import React from 'react';
import { Box, Typography } from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box component="footer" width={"100%"} position={"absolute"} bottom={0} sx={{ py: 2, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        © 2024 Banking App
      </Typography>
    </Box>
  );
};