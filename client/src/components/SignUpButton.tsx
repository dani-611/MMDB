import { Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router';

export const SignUpButton = () => {
  return (
    <>
      <Link to="/signup" component={RouterLink}>
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
