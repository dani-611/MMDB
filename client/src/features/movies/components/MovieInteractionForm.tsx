import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Rating,
  Typography,
  Alert,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moviesServices from '../../../services/moviesServices';

interface InteractionFormProps {
  movieUuid: string;
}

export const MovieInteractionForm = ({ movieUuid }: InteractionFormProps) => {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: { rating?: number; title?: string; body?: string }) =>
      moviesServices.submitInteraction(movieUuid, payload),
    onSuccess: () => {
      setSuccess(true);
      setTitle('');
      setBody('');
      setRating(null);
      queryClient.invalidateQueries({ queryKey: ['movie', movieUuid] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    mutation.mutate({
      ...(rating !== null && { rating }),
      ...(title.trim() && { title }),
      ...(body.trim() && { body }),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        p: 3,
        bgcolor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: '600' }}>
        Rate & Review this Movie
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Review saved successfully!
        </Alert>
      )}
      {mutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to save interaction
        </Alert>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
        <Typography variant="body1">Your Rating:</Typography>
        <Rating
          max={10}
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
        />
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Review title (e.g., Incredible visuals!)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        placeholder="Write your review here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={mutation.isPending}
      >
        Submit Interaction
      </Button>
    </Box>
  );
};
