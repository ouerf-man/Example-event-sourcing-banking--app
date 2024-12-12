import React from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

type TypographyProps = MuiTypographyProps & {
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <MuiTypography {...props}>
      {children}
    </MuiTypography>
  );
};
