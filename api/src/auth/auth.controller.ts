import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/request/sign-up-request.dto';
import { SignInRequestDto } from './dto/request/sign-in-request.dto';
import { AuthResponseDto } from './dto/response/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: SignUpRequestDto): Promise<AuthResponseDto> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() dto: SignInRequestDto): Promise<AuthResponseDto> {
    return this.authService.signIn(dto);
  }
}
