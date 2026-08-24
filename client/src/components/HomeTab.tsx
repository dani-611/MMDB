import { Button } from '@mui/material';

export const HomeTab = () => {
  return (
    <Button
      variant="text"
      href="/"
      disableRipple
      sx={{
        color: 'black',
        fontWeight: '400',
        fontSize: '1rem',
        textTransform: 'none',
        marginLeft: '2rem',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      Home
    </Button>
  );
};
