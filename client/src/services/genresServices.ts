import { apiClient } from './apiClient';
import { type Genre } from '../types/genre';

class GenresServices {
  private apiPath = import.meta.env.VITE_GENRES_ENDPOINT;

  getList = async () => {
    const response = await apiClient.get<Genre[]>(this.apiPath);
    return response.data;
  };
}
export default new GenresServices();
