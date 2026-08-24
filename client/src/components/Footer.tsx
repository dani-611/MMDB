import { MMDBLogo } from './MMDBLogo';
import { Box, Stack } from '@mui/material';
import { AboutLink } from './AboutLink';
import { TermsOfUseLink } from './TermsOfUseLink';
import { PrivacyPolicyLink } from './PrivacyPolicyLink';
import { HelpLink } from './HelpLink';
import { AllRightsReserved } from './AllRightsReserved';

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
        <AboutLink />
        <TermsOfUseLink />
        <PrivacyPolicyLink />
        <HelpLink />
      </Stack>

      <Box>
        <AllRightsReserved />
      </Box>
    </Box>
  );
};
