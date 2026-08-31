export interface AuthResponse {
  accessToken: string;
  user: {
    email: string;
    firstName: string;
    displayName: string;
  };
}
