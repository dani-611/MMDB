import { apiClient } from './apiClient';
import { type MoviesResponse } from '../features/movies/types/movies-response.type';
import type {
  MovieDetails,
  UserReview,
} from '../features/movies/types/movie-details.type';
import { type PaginationResponseDto } from '../types/pagination-response.type';

interface GetListParams {
  page?: string | null;
  pageSize?: string | null;
}

class MoviesServices {
  getList = async (params?: GetListParams) => {
    const response = await apiClient.get<MoviesResponse>('/movies', {
      params: {
        ...(params?.page && { page: params.page }),
        ...(params?.pageSize && { pageSize: params.pageSize }),
      },
    });
    return response.data;
  };

  getOne = async (uuid: string) => {
    const token =
      localStorage.getItem('mmdb_token') ||
      sessionStorage.getItem('mmdb_token');
    const response = await apiClient.get<MovieDetails>(`/movies/${uuid}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  };

  submitInteraction = async (
    uuid: string,
    payload: { rating?: number; title?: string; body?: string }
  ) => {
    const response = await apiClient.post<{ message: string }>(
      `/movies/${uuid}/interaction`,
      payload
    );
    return response.data;
  };

  getReviews = async (uuid: string, page: number, pageSize: number = 5) => {
    const response = await apiClient.get<PaginationResponseDto<UserReview>>(
      `/movies/${uuid}/reviews`,
      {
        params: { page, pageSize },
      }
    );
    return response.data;
  };
}
export default new MoviesServices();
