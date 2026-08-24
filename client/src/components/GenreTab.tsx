import * as React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useFetch } from '../hooks/useFetch';
import { ApiStatus } from '../constants/ApiStatus';

interface Genre {
  uuid: string;
  name: string;
}
interface Genres {
  data: Genre[];
  totalGenres: number;
}

export const GenreTab = () => {
  const [url, setUrl] = React.useState<string>('');
  const { status, response, error } = useFetch<Genres>(url);
  const data = response ? response.data : [];
  const id = React.useId();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setUrl('http://localhost:3000/genres');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMenuItems = () => {
    if (!url) return null;

    switch (status) {
      case ApiStatus.LOADING:
        return <MenuItem onClick={handleClose}>Loading...</MenuItem>;
      case ApiStatus.ERROR:
        return (
          <MenuItem onClick={handleClose}>
            Error Loading Genres: {error}
          </MenuItem>
        );
      case ApiStatus.EMPTY:
        return <MenuItem onClick={handleClose}>No Genres Found</MenuItem>;
      case ApiStatus.DATA:
        if (!Array.isArray(data)) {
          return (
            <MenuItem onClick={handleClose}>
              Error: API response is not an array
            </MenuItem>
          );
        }

        return data.map((genre) => (
          <MenuItem key={genre.uuid} onClick={handleClose}>
            {genre.name}
          </MenuItem>
        ));
      default:
        return null;
    }
  };

  return (
    <div>
      <Button
        id={`${id}-button`}
        aria-controls={open ? `${id}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open}
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
        open={open}
        onClose={handleClose}
        slotProps={{
          list: { 'aria-labelledby': `${id}-button` },
        }}
      >
        {renderMenuItems()}
      </Menu>
    </div>
  );
};
