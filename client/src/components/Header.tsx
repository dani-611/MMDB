import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { GenreTab } from './GenreTab';
import { HomeTab } from './HomeTab';
import { LoginButton } from './LoginButton';
import { MMDBLogo } from './MMDBLogo';
import { SearchField } from './SearchField';
import { SignUpButton } from './SignUpButton';

export const Header = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#FFFF',
          top: 0,
          left: 0,
          right: 0,
          px: { xs: '0rem', sm: '1rem', md: '4rem', lg: '8rem' },
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: 'none',
          borderBottom: '1px solid #dddddd',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <MMDBLogo />
            <HomeTab />
            <GenreTab />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SearchField />
            <SignUpButton />
            <LoginButton />
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  );
};
