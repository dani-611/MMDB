import { apiClient } from './apiClient';
import { type GenreItem } from '../types/genre-item.type';

class GenresServices {
  private apiPath = import.meta.env.VITE_GENRES_ENDPOINT;

  getList = async () => {
    const response = await apiClient.get<GenreItem[]>(this.apiPath);
    return response.data;
  };
}
export default new GenresServices();
