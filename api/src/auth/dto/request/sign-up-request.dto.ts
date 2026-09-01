import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { SignInRequestDto } from './sign-in-request.dto';

export class SignUpRequestDto extends SignInRequestDto {
  @IsNotEmpty({ message: 'First name is required!' })
  @IsString({ message: 'First name must be text!' })
  @MaxLength(50, { message: 'First name cannot exceeed 50 characters!' })
  firstName!: string;

  @IsNotEmpty({ message: 'Last name is required!' })
  @IsString({ message: 'Last name must be text!' })
  @MaxLength(50, { message: 'Last name cannot exceed 50 characters!' })
  lastName!: string;
}
