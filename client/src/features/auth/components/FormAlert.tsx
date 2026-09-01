import { Alert } from '@mui/material';

interface FormAlertProps {
  message: string | null;
}

export const FormAlert = ({ message }: FormAlertProps) => {
  if (!message) return null;
  return (
    <Alert
      sx={{ mb: 3, px: 1, py: 0.25, width: '100%', borderRadius: '8px' }}
      severity="error"
    >
      {message}
    </Alert>
  );
};
