import { MMDBLogo } from './MMDBLogo';
import { Box, Link, Stack } from '@mui/material';
import { AllRightsReserved } from './AllRightsReserved';

const footerLinks = [
  {
    label: 'About',
    href: 'https://www.imdb.com/pressroom/about/',
  },
  {
    label: 'Terms Of Use',
    href: 'https://www.imdb.com/conditions/?ref_=hm_ftr',
  },
  {
    label: 'Privacy Policy',
    href: 'https://www.imdb.com/privacy/?ref_=hm_ftr',
  },
  {
    label: 'Help',
    href: 'https://help.imdb.com/imdb',
  },
];

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#013862',
        py: 4,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        width: '100%',
        mt: 'auto',
      }}
    >
      <Box>
        <MMDBLogo />
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 2, sm: 4 }}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        }}
      >
        {footerLinks.map((link) => {
          return (
            <Link
              key={link.label}
              href={link.href}
              underline="hover"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'white' }}
            >
              {link.label}
            </Link>
          );
        })}
      </Stack>

      <Box>
        <AllRightsReserved />
      </Box>
    </Box>
  );
};
