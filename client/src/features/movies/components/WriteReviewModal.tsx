import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface WriteReviewModalProps {
  open: boolean;
  onClose: () => void;
  movieTitle: string;
  moviePoster: string | null;
  onSubmit: (title: string, body: string) => void;
  isPending: boolean;
}

export const WriteReviewModal = ({
  open,
  onClose,
  movieTitle,
  moviePoster,
  onSubmit,
  isPending,
}: WriteReviewModalProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onSubmit(title, body);
      setTitle('');
      setBody('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 0, px: 4, pb: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
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
                WRITE A REVIEW
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: '700', lineHeight: 1.2 }}
              >
                {movieTitle}
              </Typography>
            </Box>
          </Box>

          <Typography variant="subtitle2" sx={{ fontWeight: '700', mb: 0.5 }}>
            Title
          </Typography>
          <TextField
            fullWidth
            placeholder="Sum up your review in a line"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2.5 }}
            required
          />

          <Typography variant="subtitle2" sx={{ fontWeight: '700', mb: 0.5 }}>
            Review
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder={`Share your thoughts on ${movieTitle}...`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            sx={{ mb: 3 }}
            required
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="text" onClick={onClose} sx={{ color: 'grey.600' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isPending}
              sx={{ bgcolor: '#1976d2', px: 4 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
