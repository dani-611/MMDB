import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Typography,
  Pagination,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { useQuery } from '@tanstack/react-query';
import moviesServices from '../../../services/moviesServices';
import { type PaginationResponseDto } from '../../../types/pagination-response.type';
import { type UserReview } from '../types/movie-details.type';

interface MovieReviewsModalProps {
  open: boolean;
  onClose: () => void;
  movieUuid: string;
}

export const MovieReviewsModal = ({
  open,
  onClose,
  movieUuid,
}: MovieReviewsModalProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading } = useQuery<PaginationResponseDto<UserReview>>({
    queryKey: ['movie-reviews', movieUuid, page],
    queryFn: () => moviesServices.getReviews(movieUuid, page, pageSize),
    enabled: open,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        All Reviews
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {isLoading ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>Loading reviews...</Box>
        ) : (
          <>
            <List>
              {data?.results.map((rev) => (
                <ListItem
                  key={rev.uuid}
                  alignItems="flex-start"
                  sx={{ px: 0, pb: 2 }}
                >
                  <ListItemAvatar>
                    <Avatar>{rev.displayName.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                        }}
                      >
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <Typography sx={{ fontWeight: '600' }}>
                            {rev.displayName}
                          </Typography>
                          {rev.rating && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: '#f0f0f0',
                                px: 0.8,
                                borderRadius: 1,
                              }}
                            >
                              <StarRateRoundedIcon
                                sx={{ color: '#ffb601', fontSize: '1rem' }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ fontWeight: '600' }}
                              >
                                {rev.rating}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        {rev.title && (
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: '600', color: 'text.primary' }}
                          >
                            {rev.title}
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={rev.body}
                  />
                </ListItem>
              ))}
            </List>

            {data && data.totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={data.totalPages}
                  page={page}
                  onChange={(_, p) => setPage(p)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
