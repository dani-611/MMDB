import { Button, Link } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router';

export const SignUpButton = () => {
  const location = useLocation();

  return (
    <>
      <Link
        to="/signup"
        component={RouterLink}
        state={{ from: location.pathname }}
      >
        <Button
          sx={{
            fontWeight: '600',
            fontSize: '0.8rem',
            textDecoration: 'none',
            textTransform: 'none',
          }}
          variant="text"
        >
          Sign Up
        </Button>
      </Link>
    </>
  );
};
