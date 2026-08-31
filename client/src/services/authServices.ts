import { apiClient } from './apiClient';
import { type AuthResponse } from '../features/auth/types/auth-repsonse.type';
import { type SignInRequest } from '../features/auth/types/login-request.type';
import { type SignUpRequest } from '../features/auth/types/sign-in-request.type';

class AuthServices {
  signIn = async (data: SignInRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signin', data);
    return response.data;
  };

  signUp = async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    return response.data;
  };
}

export default new AuthServices();
