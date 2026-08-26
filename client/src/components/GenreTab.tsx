import { useState, useId } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useFetch } from '../hooks/useFetch';
import { API_CONFIG } from '../config/api.config';
import { type Genre } from '../types/genre';

export const GenreTab = () => {
  const id = useId();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const fullUrl = `${API_CONFIG.apiBaseUrl}${API_CONFIG.genresEndpoint}`;
  const { status, response: genres, error } = useFetch<Genre[]>(fullUrl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button
        id={`${id}-button`}
        aria-controls={isOpen ? `${id}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        disableRipple
        sx={{
          color: '#777777',
          textTransform: 'none',
          transition: 'none',
          '&:hover, &:active': { backgroundColor: 'transparent' },
          '& .MuiButton-endIcon': { margin: '0' },
        }}
      >
        Genre
      </Button>
      <Menu
        id={`${id}-menu`}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        slotProps={{ list: { 'aria-labelledby': `${id}-button` } }}
      >
        {status === 'LOADING' && <MenuItem disabled>Loading...</MenuItem>}
        {status === 'ERROR' && (
          <MenuItem disabled>Error Loading Genres: {error}</MenuItem>
        )}
        {status === 'EMPTY' && <MenuItem disabled>No Genres Found</MenuItem>}

        {status === 'DATA' &&
          Array.isArray(genres) &&
          genres.map((genre) => (
            <MenuItem key={genre.uuid} onClick={handleClose}>
              {genre.name}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};
