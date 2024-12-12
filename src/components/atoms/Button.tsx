import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

type ButtonProps = MuiButtonProps & {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <MuiButton {...props}>
      {children}
    </MuiButton>
  );
};
