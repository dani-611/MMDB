import { Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router';

export const LoginButton = () => {
  return (
    <>
      <Link to="/login" component={RouterLink}>
        <Button
          variant="contained"
          disableElevation
          sx={{
            fontWeight: '600',
            fontSize: '0.8rem',
            textTransform: 'none',
            textDecoration: 'none',
            color: 'white',
            paddingLeft: '1.2rem',
            paddingRight: '1.2rem',
            borderRadius: '10px',
          }}
        >
          Log In
        </Button>
      </Link>
    </>
  );
};
