import { useState, useId } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useQuery } from '@tanstack/react-query';
import genreServices from '../services/genresServices';

export const GenreTab = () => {
  const id = useId();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const {
    data: genres,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['genres'],
    queryFn: genreServices.getList,
    enabled: isOpen,
    staleTime: 5 * 60 * 1000,
  });
  const isEmpty = genres && genres.length === 0;

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
        {isPending && <MenuItem disabled>Loading...</MenuItem>}
        {isEmpty && <MenuItem disabled>No Genres Found</MenuItem>}
        {isError && (
          <MenuItem disabled>Error Loading Genres: {error?.message}</MenuItem>
        )}
        {(genres || []).map((genre) => (
          <MenuItem key={genre.uuid} onClick={handleClose}>
            {genre.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
