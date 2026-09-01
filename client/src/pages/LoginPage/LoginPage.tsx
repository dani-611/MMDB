import { Box } from '@mui/material';
import { LoginForm } from '../../features/auth/components/LoginForm';
import { MMDBLogo } from '../../components/MMDBLogo';

export const LoginPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f8f8f8',
        paddingTop: '3rem',
        flex: 1,
        paddingBottom: '3rem',
        px: { xs: '1rem', sm: '3rem', md: '6rem', lg: '10rem' },
        textAlign: 'center',
      }}
    >
      <MMDBLogo sx={{ fontSize: '2rem' }} />
      <LoginForm />
    </Box>
  );
};
