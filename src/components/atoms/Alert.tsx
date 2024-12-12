// components/atoms/Alert.tsx

import React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';

type AlertProps = MuiAlertProps & {
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ children, ...props }) => {
  return (
    <MuiAlert {...props}>
      {children}
    </MuiAlert>
  );
};
