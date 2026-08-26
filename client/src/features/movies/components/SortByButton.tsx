import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export const SortByButton = () => {
  return (
    <>
      <Button
        variant="outlined"
        sx={{
          color: '#888888',
          borderRadius: '2rem',
          textTransform: 'none',
          borderColor: '#e1e1e1e1',
          padding: '0.1rem 0.9rem',
          fontSize: '1.2rem',
        }}
      >
        <FilterListIcon sx={{ marginRight: '5px', height: '40px' }} />
        Sort by
      </Button>
    </>
  );
};
