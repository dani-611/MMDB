import { useState } from 'react';
import { Checkbox, FormControlLabel, Link, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FormContainer } from './FormContainer';
import { FormField } from './FormField';
import { FormSubmitButton } from './FormSubmitButton';
import { PasswordField } from './PasswordField';
import AuthServices from '../../../services/authServices';
import type { AuthResponse } from '../types/auth-repsonse.type';
import type { SignInRequest } from '../types/login-request.type';
import { useAuth } from '../../../context/AuthContext';

interface NestApiError {
  message?: string | string[];
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loginMutation = useMutation<
    AuthResponse,
    AxiosError<NestApiError>,
    SignInRequest
  >({
    mutationFn: AuthServices.signIn,
    onSuccess: (data) => {
      setErrorMessage(null);
      login(data);
      navigate('/movies');
    },
    onError: (error) => {
      const serverMessage = error.response?.data?.message;
      setErrorMessage(
        serverMessage
          ? Array.isArray(serverMessage)
            ? serverMessage.join(', ')
            : serverMessage
          : 'Invalid credentials! Please try again...'
      );
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    loginMutation.mutate({ email, password });
  };

  const isPending = loginMutation.isPending;

  return (
    <FormContainer
      title="Sign in"
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
    >
      <FormField
        label="Email"
        id="email"
        type="email"
        required
        placeholder="email@example.com"
        value={email}
        disabled={isPending}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordField
        value={password}
        disabled={isPending}
        onChange={(e) => setPassword(e.target.value)}
        headerElement={
          <Link
            href="/"
            variant="body2"
            sx={{ textDecoration: 'none', color: '#1976d2', fontWeight: '500' }}
          >
            Forgot password?
          </Link>
        }
      />

      <FormSubmitButton label="Sign in" isPending={isPending} />

      <FormControlLabel
        label="Keep me signed in"
        control={
          <Checkbox
            name="remember"
            value="true"
            color="primary"
            sx={{ pr: 0.5, pl: 0, '& .MuiSvgIcon-root': { fontSize: 20 } }}
          />
        }
        sx={{ width: '100%', justifyContent: 'flex-start', ml: 0, my: 0.5 }}
        slotProps={{
          typography: { color: 'textSecondary', sx: { fontSize: '14px' } },
        }}
      />

      <Typography
        variant="body2"
        sx={{ textAlign: 'start', width: '100%', color: 'text.secondary' }}
      >
        New to MMDB?{' '}
        <Link
          component={RouterLink}
          to="/signup"
          sx={{ textDecoration: 'none', fontWeight: '500', color: '#1976d2' }}
        >
          Sign up
        </Link>
      </Typography>
    </FormContainer>
  );
};
