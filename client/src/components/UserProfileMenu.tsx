import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../context/AuthContext';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const UserProfileMenu = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  if (!user) return null;

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleCloseMenu();
    logout();
  };

  return (
    <>
      <Box
        onClick={handleOpenMenu}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          userSelect: 'none',
          '&:hover': { opacity: 0.8 },
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: '#1976d2',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          {user.firstName.charAt(0).toUpperCase()}
        </Avatar>
        <Typography
          variant="body2"
          sx={{ color: 'text.primary', fontWeight: '500' }}
        >
          {user.firstName}
        </Typography>
        <IconButton size="small" sx={{ p: 0, color: 'text.secondary' }}>
          <ArrowDropDownIcon
            sx={{
              transform: isMenuOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease-in-out',
            }}
          />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        disableScrollLock
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1.5,
              overflow: 'visible',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              minWidth: '120px',
            },
          },
        }}
      >
        <MenuItem
          onClick={handleLogoutClick}
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'error.main',
            py: 1,
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
