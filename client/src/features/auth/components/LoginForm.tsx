import * as React from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  OutlinedInput,
  Link,
  Typography,
  Box,
  Container,
  Paper,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { FormAlert, PasswordField } from './FormShared';

export const LoginForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    alert(
      `Logging in: ${data.get('email')}, Checkbox: ${data.get('remember')}`
    );
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
          Sign in
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

          <Box sx={{ width: '100%', mb: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 0.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: '600', color: 'text.primary' }}
              >
                Password
              </Typography>
              <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  fontWeight: '500',
                }}
              >
                Forgot password?
              </Link>
            </Box>
            <PasswordField />
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="medium"
            disableElevation
            fullWidth
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
            Sign in
          </Button>

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
            sx={{
              width: '100%',
              justifyContent: 'flex-start',
              ml: 0,
              mt: 0,
              mb: 0.5,
            }}
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
              sx={{
                textDecoration: 'none',
                fontWeight: '500',
                color: '#1976d2',
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
