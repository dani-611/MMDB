import { Expose } from 'class-transformer';

export class AuthUserDto {
  @Expose()
  email!: string;

  @Expose()
  firstName!: string;

  @Expose()
  displayName!: string;
}
