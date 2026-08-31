import { Container, Paper, Box, Typography } from '@mui/material';
import { FormAlert } from './FormAlert';

interface FormContainerProps {
  title: string;
  errorMessage: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const FormContainer = ({
  title,
  errorMessage,
  onSubmit,
  children,
}: FormContainerProps) => (
  <Container component="main" maxWidth="xs" sx={{ mt: 1 }}>
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: '12px',
        border: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: '700', width: '100%', textAlign: 'left', mb: 1 }}
      >
        {title}
      </Typography>
      <FormAlert message={errorMessage} />
      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{ width: '100%' }}
      >
        {children}
      </Box>
    </Paper>
  </Container>
);
