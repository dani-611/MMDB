import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  Rating,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

interface RateMovieModalProps {
  open: boolean;
  onClose: () => void;
  movieTitle: string;
  moviePoster: string | null;
  onSubmit: (rating: number) => void;
  isPending: boolean;
}

export const RateMovieModal = ({
  open,
  onClose,
  movieTitle,
  moviePoster,
  onSubmit,
  isPending,
}: RateMovieModalProps) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedRating !== null) {
      onSubmit(selectedRating);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 0, px: 3, pb: 4, textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            mb: 3,
            textAlign: 'left',
          }}
        >
          <Box
            component="img"
            src={moviePoster || ''}
            alt={movieTitle}
            sx={{
              width: 60,
              height: 90,
              borderRadius: '4px',
              objectFit: 'cover',
              bgcolor: '#e0e0e0',
            }}
          />
          <Box>
            <Typography
              variant="caption"
              sx={{ color: 'grey.600', fontWeight: '700', letterSpacing: 1 }}
            >
              RATE THIS
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: '700', lineHeight: 1.2 }}
            >
              {movieTitle}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ my: 3 }}>
          <Rating
            max={10}
            value={selectedRating}
            onChange={(_, value) => setSelectedRating(value)}
            emptyIcon={<StarRateRoundedIcon sx={{ fontSize: '2rem' }} />}
            icon={<StarRateRoundedIcon sx={{ fontSize: '2rem' }} />}
            sx={{ gap: 0.5 }}
          />
          <Typography
            variant="body2"
            sx={{ mt: 1, color: 'grey.500', minHeight: 20 }}
          >
            {selectedRating !== null
              ? `${selectedRating}/10`
              : 'Click a star to rate'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            disabled={selectedRating === null || isPending}
            onClick={handleSubmit}
            sx={{ bgcolor: '#1976d2', fontWeight: '600', py: 1 }}
          >
            Rate
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={onClose}
            sx={{ color: 'grey.600' }}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
