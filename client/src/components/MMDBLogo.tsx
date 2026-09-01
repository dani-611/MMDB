import { Button, type SxProps, type Theme } from '@mui/material';

interface MMDBLogoProps {
  sx?: SxProps<Theme>;
  href?: string;
}

export const MMDBLogo = ({ sx, href }: MMDBLogoProps) => {
  return (
    <Button
      variant="text"
      disableRipple
      href={href}
      sx={{
        fontWeight: '600',
        fontSize: '1.6rem',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        ...sx,
      }}
    >
      MMDB
    </Button>
  );
};
