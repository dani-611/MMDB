import { Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router';

export const SignUpButton = () => {
  return (
    <>
      <Button variant="text">
        <Link
          sx={{
            fontWeight: '600',
            fontSize: '0.8rem',
            textDecoration: 'none',
            textTransform: 'none',
          }}
          to="/signup"
          component={RouterLink}
        >
          Sign Up
        </Link>
      </Button>
    </>
  );
};
