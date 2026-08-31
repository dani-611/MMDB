import { Typography } from '@mui/material';

export const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="body2"
    sx={{
      fontWeight: '600',
      mb: 0.5,
      textAlign: 'left',
      color: 'text.primary',
    }}
  >
    {children}
  </Typography>
);
