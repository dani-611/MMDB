import { apiClient } from './apiClient';
import { type GenreItem } from '../types/genre-item.type';

class GenresServices {
  getList = async () => {
    const response = await apiClient.get<GenreItem[]>('/genres');
    return response.data;
  };
}
export default new GenresServices();
