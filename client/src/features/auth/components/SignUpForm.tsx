import { useState } from 'react';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FormContainer } from './FormContainer';
import { FormField } from './FormField';
import { FormSubmitButton } from './FormSubmitButton';
import { PasswordField } from './PasswordField';
import AuthServices from '../../../services/authServices';
import type { AuthResponse } from '../types/auth-repsonse.type';
import type { SignUpRequest } from '../types/sign-in-request.type';
import { useAuth } from '../../../context/AuthContext';

interface NestApiError {
  message?: string | string[];
}

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signupMutation = useMutation<
    AuthResponse,
    AxiosError<NestApiError>,
    SignUpRequest
  >({
    mutationFn: AuthServices.signUp,
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
          : 'Registration failed! Please try again...'
      );
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('All fields are required!');
      return;
    }
    signupMutation.mutate({ firstName, lastName, email, password });
  };

  const isPending = signupMutation.isPending;

  return (
    <FormContainer
      title="Create your account"
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
    >
      <FormField
        label="First name"
        id="firstName"
        type="text"
        required
        placeholder="John"
        value={firstName}
        disabled={isPending}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <FormField
        label="Last name"
        id="lastName"
        type="text"
        required
        placeholder="Doe"
        value={lastName}
        disabled={isPending}
        onChange={(e) => setLastName(e.target.value)}
      />

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
      />

      <FormSubmitButton label="Sign up" isPending={isPending} />

      <Typography
        variant="body2"
        sx={{
          textAlign: 'start',
          width: '100%',
          color: 'text.secondary',
          mt: 1,
        }}
      >
        Already have an account?{' '}
        <Link
          component={RouterLink}
          to="/login"
          sx={{ textDecoration: 'none', fontWeight: '500', color: '#1976d2' }}
        >
          Sign in
        </Link>
      </Typography>
    </FormContainer>
  );
};
