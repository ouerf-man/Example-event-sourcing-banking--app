
import React from 'react';
import { Box } from '@mui/material';
import {Typography, Input} from '@/components';

export type FormFieldProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: string;
  step?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  min,
  step,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        inputProps={{ min, step }}
      />
    </Box>
  );
};
