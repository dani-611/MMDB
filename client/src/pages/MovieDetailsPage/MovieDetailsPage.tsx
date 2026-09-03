import { useState } from 'react';
import {
  Box,
  Grid as Grid,
  Typography,
  CardMedia,
  Button,
  Avatar,
  Link,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import moviesServices from '../../services/moviesServices';
import { RateMovieModal } from '../../features/movies/components/RateMovieModal';
import { WriteReviewModal } from '../../features/movies/components/WriteReviewModal';
import { MovieReviewsModal } from '../../features/movies/components/MovieReviewsModal';
import { useAuth } from '../../context/AuthContext';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

export const MovieDetailsPage = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isAuthenticated, user } = useAuth();

  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [allReviewsOpen, setAllReviewsOpen] = useState(false);

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movie', uuid],
    queryFn: () => moviesServices.getOne(uuid!),
    enabled: !!uuid,
  });

  const interactionMutation = useMutation({
    mutationFn: (payload: { rating?: number; title?: string; body?: string }) =>
      moviesServices.submitInteraction(uuid!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movie', uuid] });
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      queryClient.invalidateQueries({ queryKey: ['movie-reviews', uuid] });
    },
  });

  if (isLoading)
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>Loading movie details...</Box>
    );
  if (isError || !movie)
    return (
      <Box sx={{ p: 5, color: 'red', textAlign: 'center' }}>
        Error loading data profiles.
      </Box>
    );

  const userRating = movie.myRating ?? null;

  const hasAlreadyReviewed = movie.userReviews?.some(
    (rev) => rev.displayName === user?.displayName
  );

  const formatRuntime = (totalMinutes: number | null): string => {
    if (!totalMinutes) return 'N/A';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const formatDisplayName = (fullName: string): string => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length < 2) return fullName;
    const lastName = parts[parts.length - 1];
    const firstName = parts.slice(0, parts.length - 1).join(' ');
    return `${firstName} ${lastName.charAt(0).toUpperCase()}.`;
  };

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const created = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - created.getTime());
    return `${Math.floor(diffTime / (1000 * 60 * 60 * 24))}d`;
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f8f8f8',
        minHeight: '100vh',
        pt: '2rem',
        pb: '4rem',
        px: { xs: '1rem', sm: '3rem', md: '6rem', lg: '10rem' },
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link
          component="button"
          onClick={() => navigate('/')}
          sx={{
            underline: 'none',
            color: 'grey.700',
            fontWeight: '500',
            fontSize: '0.9rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          Home
        </Link>
        <Typography sx={{ color: 'grey.500', fontSize: '0.9rem' }}>
          |
        </Typography>
        <Typography
          sx={{ color: 'grey.900', fontWeight: '600', fontSize: '0.9rem' }}
        >
          {movie.title}
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          p: { xs: 2, md: 4 },
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <Grid container spacing={2} sx={{ mb: 4, alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, sm: 4, md: 3 }} sx={{ display: 'flex' }}>
            <CardMedia
              component="img"
              image={movie.posterUrl || ''}
              alt={movie.title}
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '6px',
                objectFit: 'cover',
                bgcolor: '#eaeaea',
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 9 }} sx={{ display: 'flex' }}>
            {movie.trailerUrl ? (
              <Box
                component="video"
                controls
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '6px',
                  backgroundColor: '#000000',
                  objectFit: 'cover',
                }}
              >
                <source src={movie.trailerUrl} type="video/mp4" />
              </Box>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  minHeight: 250,
                  borderRadius: '6px',
                  backgroundColor: '#efefef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography color="text.secondary">
                  No Trailer Available
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mb: 1, display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: '800', color: 'grey.900' }}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: 'grey.500', fontWeight: '400' }}
          >
            ({movie.releaseYear})
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StarRateRoundedIcon
              sx={{ color: '#ffb601', fontSize: '1.8rem', mr: 0.2 }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: '700', color: '#1976d2', mr: 1 }}
            >
              {movie.rating ? Number(movie.rating).toFixed(1) : '0.0'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              Reviews({movie.reviewsCount})
            </Typography>
          </Box>

          {isAuthenticated && (
            <>
              <Typography sx={{ color: 'grey.300' }}>|</Typography>
              {userRating !== null ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarRateRoundedIcon
                    sx={{ color: '#1976d2', fontSize: '1.6rem' }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: '700', color: '#1976d2' }}
                  >
                    {userRating}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'grey.500', ml: 0.5 }}
                  >
                    Your Rating
                  </Typography>
                </Box>
              ) : (
                <Button
                  variant="text"
                  onClick={() => setRateModalOpen(true)}
                  startIcon={
                    <StarBorderRoundedIcon
                      sx={{ fontSize: '1.6rem', color: '#1976d2' }}
                    />
                  }
                  sx={{
                    color: '#1976d2',
                    fontWeight: '700',
                    textTransform: 'none',
                    p: 0,
                  }}
                >
                  Rate
                </Button>
              )}
            </>
          )}
        </Box>

        <Typography
          variant="body2"
          sx={{ mb: 3, color: 'grey.500', fontWeight: '500' }}
        >
          {formatRuntime(movie.runtimeMinutes)} •{' '}
          {movie.genres?.join(', ') || 'N/A'}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: '700', color: 'grey.900', mb: 1 }}
          >
            Overview
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'grey.700', lineHeight: 1.6 }}
          >
            {movie.overview}
          </Typography>
        </Box>

        <Box sx={{ mb: 5, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body1">
            <strong>Directors: {movie.directors?.join(', ') || 'N/A'} </strong>
          </Typography>
          <Typography variant="body1">
            <strong>Writer: {movie.writers?.join(', ') || 'N/A'} </strong>
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.800' }}>
            <strong>Language:</strong> {movie.language?.toLowerCase() || 'N/A'}
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: '800', color: 'grey.900', mb: 3 }}
          >
            Cast
          </Typography>
          <Grid container spacing={2}>
            {movie.cast?.map((actor) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={actor.uuid}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1.5,
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    gap: 1.5,
                    bgcolor: '#ffffff',
                  }}
                >
                  <Avatar
                    src={actor.photoUrl || ''}
                    variant="rounded"
                    sx={{ width: 50, height: 65 }}
                  />
                  <Box sx={{ overflow: 'hidden' }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: '700',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      }}
                    >
                      {actor.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'grey.500' }}>
                      {actor.characterName}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ mt: 6 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: '800', color: 'grey.900' }}
            >
              User Reviews
            </Typography>
            {movie.reviewsCount > 3 && (
              <Button
                variant="text"
                onClick={() => setAllReviewsOpen(true)}
                sx={{
                  color: '#1976d2',
                  fontWeight: '700',
                  textTransform: 'none',
                }}
              >
                View more
              </Button>
            )}
          </Box>

          {isAuthenticated && !hasAlreadyReviewed && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2.5,
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                mb: 4,
                bgcolor: '#fafafa',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#1976d2', fontWeight: '600' }}>
                  {user?.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : 'U'}
                </Avatar>
                <Typography
                  sx={{
                    color: 'grey.600',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                  }}
                >
                  Share your thoughts on {movie.title}...
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => setReviewModalOpen(true)}
                sx={{
                  bgcolor: '#1976d2',
                  textTransform: 'none',
                  fontWeight: '600',
                  px: 3,
                }}
              >
                Write a review
              </Button>
            </Box>
          )}

          <Grid container spacing={2}>
            {movie.userReviews?.slice(0, 3).map((review) => (
              <Grid
                size={{ xs: 12, md: 4 }}
                key={review.uuid}
                sx={{ display: 'flex' }}
              >
                <Box
                  sx={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    p: 2.5,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#f5f5f5',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: 'grey.400',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                      }}
                    >
                      {review.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ overflow: 'hidden' }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: '700',
                          color: 'grey.900',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {formatDisplayName(review.displayName)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'grey.400' }}>
                        {formatTimeAgo(review.createdAt)} ago
                      </Typography>
                    </Box>
                  </Box>

                  {review.rating && (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
                    >
                      <StarRateRoundedIcon
                        sx={{ color: '#ffb601', fontSize: '1.2rem', mr: 0.3 }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: '700', color: 'grey.700' }}
                      >
                        {review.rating}
                      </Typography>
                    </Box>
                  )}

                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: '700',
                      color: 'grey.900',
                      mb: 0.5,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {review.title || 'Untitled Review'}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'grey.600',
                      lineHeight: 1.5,
                      wordBreak: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {review.body}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <RateMovieModal
        open={rateModalOpen}
        onClose={() => setRateModalOpen(false)}
        movieTitle={movie.title}
        moviePoster={movie.posterUrl}
        isPending={interactionMutation.isPending}
        onSubmit={(rating) => {
          interactionMutation.mutate({ rating });
        }}
      />

      <WriteReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        movieTitle={movie.title}
        moviePoster={movie.posterUrl}
        isPending={interactionMutation.isPending}
        onSubmit={(title, body) => interactionMutation.mutate({ title, body })}
      />

      <MovieReviewsModal
        open={allReviewsOpen}
        onClose={() => setAllReviewsOpen(false)}
        movieUuid={movie.uuid}
      />
    </Box>
  );
};
