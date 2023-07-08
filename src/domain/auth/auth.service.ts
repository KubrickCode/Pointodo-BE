import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@domain/user/interfaces/iuser.repository';
import { UserEntity } from '@domain/user/entities/user.entity';
import { IPasswordHasher } from '@domain/user/interfaces/ipasswordHasher';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { ITokenService } from './interfaces/itoken.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('존재하지 않는 계정입니다');
    }

    const isCorrectPassword = await this.passwordHasher.comparePassword(
      password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다');
    }

    return user;
  }

  generateAccessToken(user: UserEntity): string {
    return this.tokenService.generateAccessToken(user);
  }

  generateRefreshToken(user: UserEntity): string {
    return this.tokenService.generateRefreshToken(user);
  }
}
