import { Box } from '@mui/material';
import { SignUpForm } from '../../features/auth/components/SignUpForm';
import { MMDBLogo } from '../../components/MMDBLogo';

export const SignUpPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f8f8f8',
        paddingTop: '3rem',
        flex: 1,
        paddingBottom: '3rem',
        textAlign: 'center',
        px: { xs: '1rem', sm: '3rem', md: '6rem', lg: '10rem' },
      }}
    >
      <MMDBLogo sx={{ fontSize: '2rem' }} />
      <SignUpForm />
    </Box>
  );
};
