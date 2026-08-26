import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { type MovieItem } from '../types/movie-item.types';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

export const MovieCard = (movie: MovieItem) => {
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        borderRadius: '10px',
        backgroundColor: 'background.paper',
      }}
    >
      <CardActionArea
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100%',
          flexGrow: 1,
          padding: '1.2rem 1rem',
        }}
      >
        <CardMedia
          component="img"
          image={movie.posterUrl}
          alt={`${movie.posterUrl} Poster`}
          sx={{
            borderRadius: '10px',
            width: '100%',
            height: 'auto',
            aspectRatio: '2/3',
            objectFit: 'cover',
          }}
        />

        <CardContent
          sx={{
            padding: '10px 4px 4px 10px',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <StarRateRoundedIcon sx={{ color: '#ffb601' }} />
            8.9
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: '600', lineHeight: '1.2', marginY: '4px' }}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: 'text.secondary', fontWeight: '300' }}
          >
            {movie.releaseYear}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
