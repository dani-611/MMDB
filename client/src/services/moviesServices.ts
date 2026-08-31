import { apiClient } from './apiClient';
import { type MoviesResponse } from '../features/movies/types/movies-response.type';

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
}
export default new MoviesServices();
