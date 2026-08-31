import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { MovieCard } from './MovieCard';
import { type MovieItem } from '../types/movie-item.type';

export const MovieGrid = ({ movies }: { movies: MovieItem[] }) => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '1.5rem',
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'flex-start', alignItems: 'stretch' }}
      >
        {movies.map((movie) => (
          <Grid
            size={{ xs: 6, sm: 6, md: 4, lg: 3 }}
            key={movie.uuid}
            sx={{ display: 'flex' }}
          >
            <MovieCard {...movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
