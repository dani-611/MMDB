import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'db/entities/user.entity';
import { SignInRequestDto } from './dto/request/sign-in-request.dto';
import { SignUpRequestDto } from './dto/request/sign-up-request.dto';
import { AuthResponseDto } from './dto/response/auth-response.dto';
import { mapToDto } from 'common/utils/mapper.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpRequestDto): Promise<AuthResponseDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('An account with this email already exists!');
    }

    const displayName = `${dto.firstName} ${dto.lastName}`.trim();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const newUser = this.userRepository.create({
      email: dto.email,
      displayName,
      passwordHash,
    });
    const savedUser = await this.userRepository.save(newUser);

    return this.generateAuthPayload(savedUser);
  }

  async signIn(dto: SignInRequestDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email credentials or password!');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email credentials or password!');
    }

    return this.generateAuthPayload(user);
  }

  private async generateAuthPayload(user: User): Promise<AuthResponseDto> {
    const payload = { email: user.email, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    const firstName = user.displayName.split(' ')[0] || '';

    return mapToDto(AuthResponseDto, {
      accessToken,
      user: { email: user.email, displayName: user.displayName, firstName },
    });
  }
}
