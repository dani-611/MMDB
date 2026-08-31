import { Button, CircularProgress } from '@mui/material';

interface FormSubmitButtonProps {
  label: string;
  isPending: boolean;
}

export const FormSubmitButton = ({
  label,
  isPending,
}: FormSubmitButtonProps) => (
  <Button
    type="submit"
    variant="contained"
    disableElevation
    fullWidth
    disabled={isPending}
    sx={{
      mt: 1,
      mb: 1,
      backgroundColor: '#1976d2',
      color: '#ffffff',
      borderRadius: '8px',
      textTransform: 'none',
      fontWeight: '600',
      py: 1,
      '&:hover': { backgroundColor: '#115293' },
    }}
  >
    {isPending ? <CircularProgress size={24} color="inherit" /> : label}
  </Button>
);
