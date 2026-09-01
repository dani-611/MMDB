import { Expose, Type } from 'class-transformer';
import { AuthUserDto } from './auth-user-dto';

export class AuthResponseDto {
  @Expose()
  accessToken!: string;

  @Expose()
  @Type(() => AuthUserDto)
  user!: AuthUserDto;
}
