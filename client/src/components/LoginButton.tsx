import { Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router';

export const LoginButton = () => {
  return (
    <>
      <Button
        variant="contained"
        disableElevation
        sx={{
          paddingLeft: '1.2rem',
          paddingRight: '1.2rem',
          borderRadius: '10px',
        }}
      >
        <Link
          sx={{
            fontWeight: '600',
            fontSize: '0.8rem',
            textTransform: 'none',
            textDecoration: 'none',
            color: 'white',
          }}
          to="/login"
          component={RouterLink}
        >
          Log In
        </Link>
      </Button>
    </>
  );
};
