import { Button } from '@mui/material';

export const LoginButton = () => {
  return (
    <>
      <Button
        variant="contained"
        disableElevation
        sx={{
          fontWeight: '600',
          fontSize: '0.8rem',
          textTransform: 'none',
          paddingLeft: '1.2rem',
          paddingRight: '1.2rem',
          borderRadius: '10px',
        }}
      >
        Login
      </Button>
    </>
  );
};
