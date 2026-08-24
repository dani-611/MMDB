import { Button } from '@mui/material';

export const MMDBLogo = () => {
  return (
    <Button
      variant="text"
      href="#"
      disableRipple
      sx={{
        fontWeight: '600',
        fontSize: '1.6rem',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      MMDB
    </Button>
  );
};
