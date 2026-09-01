import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class SignInRequestDto {
  @IsEmail({}, { message: 'Please enter a valid email address!' })
  @IsNotEmpty({ message: 'Email is required!' })
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim().toLowerCase() : (value as unknown),
  )
  email!: string;

  @IsNotEmpty({ message: 'Password is required!' })
  @MinLength(8, { message: 'Password must be at least 8 characters long!' })
  password!: string;
}
