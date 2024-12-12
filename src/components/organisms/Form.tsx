import React from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';
import {FormField, Button} from '@/components';

type FormProps = {
  fields: {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    min?: string;
    step?: string;
  }[];
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  loading: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  submitLabel,
  loading,
  successMessage,
  errorMessage,
}) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 2, maxWidth: 500 }}>
      {fields.map((field, index) => (
        <FormField
          key={index}
          label={field.label}
          type={field.type}
          value={field.value}
          onChange={field.onChange}
          required={field.required}
          min={field.min}
          step={field.step}
        />
      ))}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : submitLabel}
      </Button>
      {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
      {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
    </Box>
  );
};
