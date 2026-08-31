import * as React from 'react';
import {
  Button,
  OutlinedInput,
  Link,
  Typography,
  Box,
  Container,
  Paper,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { FormAlert, PasswordField } from './FormShared';

export const SignUpForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    alert(`Signing up: ${data.get('firstName')} ${data.get('lastName')}`);
  };

  return (
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
          Create your account
        </Typography>

        <FormAlert message="This can be your error message." />

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ width: '100%' }}
        >
          <Box sx={{ width: '100%', mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: '600',
                mb: 0.5,
                textAlign: 'left',
                color: 'text.primary',
              }}
            >
              First name
            </Typography>
            <OutlinedInput
              id="firstName"
              name="firstName"
              type="text"
              required
              fullWidth
              size="small"
              placeholder="John"
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#cccccc',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#999999',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: '1px',
                },
              }}
            />
          </Box>

          <Box sx={{ width: '100%', mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: '600',
                mb: 0.5,
                textAlign: 'left',
                color: 'text.primary',
              }}
            >
              Last name
            </Typography>
            <OutlinedInput
              id="lastName"
              name="lastName"
              type="text"
              required
              fullWidth
              size="small"
              placeholder="Doe"
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#cccccc',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#999999',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: '1px',
                },
              }}
            />
          </Box>

          <Box sx={{ width: '100%', mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: '600',
                mb: 0.5,
                textAlign: 'left',
                color: 'text.primary',
              }}
            >
              Email
            </Typography>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              required
              fullWidth
              size="small"
              placeholder="email@example.com"
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#cccccc',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#999999',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                  borderWidth: '1px',
                },
              }}
            />
          </Box>

          <Box sx={{ width: '100%', mb: 3 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: '600',
                mb: 0.5,
                textAlign: 'left',
                color: 'text.primary',
              }}
            >
              Password
            </Typography>
            <PasswordField />
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="medium"
            disableElevation
            fullWidth
            sx={{
              mb: 2,
              backgroundColor: '#1976d2',
              color: '#ffffff',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: '600',
              py: 1,
              '&:hover': { backgroundColor: '#115293' },
            }}
          >
            Sign up
          </Button>

          <Typography
            variant="body2"
            sx={{ textAlign: 'start', width: '100%', color: 'text.secondary' }}
          >
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                textDecoration: 'none',
                fontWeight: '500',
                color: '#1976d2',
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
