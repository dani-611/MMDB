import { Box } from '@mui/material';
import { AllMoviesTitle } from '../../features/movies/components/AllMoviesTitle';
import { MovieGrid } from '../../features/movies/components/MoviesGrid';
import { MoviesPagination } from '../../features/movies/components/MoviesPagination';
import { SortByButton } from '../../features/movies/components/SortByButton';
import { useSearchParams } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
import { ApiStatus } from '../../constants/ApiStatus';
import { type MoviesResponse } from '../../features/movies/types/movies-response.types';
import { type MovieItem } from '../../features/movies/types/movie-item.types';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const params = new URLSearchParams();
  if (page) params.append('page', page);
  if (pageSize) params.append('pageSize', pageSize);

  const queryString = params.toString();

  const endpoint = queryString
    ? `http://localhost:3000/movies?${queryString}`
    : 'http://localhost:3000/movies';

  const { status, response, error } =
    useFetch<MoviesResponse<MovieItem>>(endpoint);

  const activePageNumber = page ? parseInt(page, 10) : 1;

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', newPage.toString());
    setSearchParams(nextParams);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f8f8f8',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        px: {
          xs: '1rem',
          sm: '3rem',
          md: '6rem',
          lg: '10rem',
        },
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}
      >
        <AllMoviesTitle />
        <SortByButton />
      </Box>

      {status === ApiStatus.LOADING && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          Loading movies...
        </Box>
      )}

      {status === ApiStatus.ERROR && (
        <Box sx={{ color: 'red', textAlign: 'center', my: 5 }}>
          Error: {error}
        </Box>
      )}

      {status === ApiStatus.EMPTY && (
        <Box sx={{ textAlign: 'center', my: 5 }}>No movies found.</Box>
      )}

      {status === ApiStatus.DATA && response && (
        <>
          <MovieGrid movies={response.results} />

          <MoviesPagination
            page={activePageNumber}
            count={response.totalPages}
            onChange={handlePageChange}
          />
        </>
      )}
    </Box>
  );
};
