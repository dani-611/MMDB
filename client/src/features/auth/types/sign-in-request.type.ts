import type { SignInRequest } from './login-request.type';

export interface SignUpRequest extends SignInRequest {
  firstName: string;
  lastName: string;
}
