import { Box } from '@mui/material';
import { AllMoviesTitle } from '../../features/movies/components/AllMoviesTitle';
import { MovieGrid } from '../../features/movies/components/MoviesGrid';
import { MoviesPagination } from '../../features/movies/components/MoviesPagination';
import { SortByButton } from '../../features/movies/components/SortByButton';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import moviesServices from '../../services/moviesServices';
import { type MoviesResponse } from '../../features/movies/types/movies-response.type';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const {
    data: response,
    isPending,
    isError,
    error,
  } = useQuery<MoviesResponse>({
    queryKey: ['movies', { page, pageSize }],
    queryFn: () => moviesServices.getList({ page, pageSize }),
    staleTime: 5 * 60 * 1000,
  });

  const isEmpty =
    !isPending && !isError && (!response || response.results.length === 0);
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
        px: { xs: '1rem', sm: '3rem', md: '6rem', lg: '10rem' },
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mb: '2rem' }}
      >
        <AllMoviesTitle />
        <SortByButton />
      </Box>

      {isPending && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          Loading movies...
        </Box>
      )}

      {isError && (
        <Box sx={{ color: 'red', textAlign: 'center', my: 5 }}>
          Error: {error?.message || 'Failed to load movies'}
        </Box>
      )}

      {isEmpty && (
        <Box sx={{ textAlign: 'center', my: 5 }}>No movies found.</Box>
      )}

      {!isPending && !isError && response && response.results.length > 0 && (
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
