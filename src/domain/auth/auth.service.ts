import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '@domain/user/entities/user.entity';
import { Inject } from '@nestjs/common';
import { ITokenService } from './interfaces/itoken.service';
import { IRedisService } from '@domain/redis/interfaces/iredis.service';
import { IUserRepository } from '@domain/user/interfaces/iuser.repository';
import { DomainResLoginDto } from './dto/login.dto';
import { jwtExpiration } from 'config/jwt.config';
import { DomainReqSocialLoginDto } from './dto/socialLogin.dto';
import { AUTH_EXPIRED_TOKEN, AUTH_INVALID_TOKEN } from './errors/auth.errors';

@Injectable()
export class AuthService {
  constructor(
    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
    @Inject('IRedisService')
    private readonly redisService: IRedisService,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async login(user: UserEntity): Promise<DomainResLoginDto> {
    const accessToken = this.tokenService.generateAccessToken(user);
    const refreshToken = this.tokenService.generateRefreshToken(user);
    await this.redisService.set(
      `refresh_token:${user.id}`,
      refreshToken,
      jwtExpiration.refreshTokenExpirationSeconds,
    );
    return { accessToken, refreshToken };
  }

  async logout(user: UserEntity): Promise<void> {
    await this.redisService.delete(`refresh_token:${user.id}`);
  }

  async refresh(token: string) {
    const decoded = this.tokenService.decodeToken(token);
    if (!decoded || !decoded.id || !decoded.email) {
      throw new UnauthorizedException(AUTH_INVALID_TOKEN);
    }
    const redisToken = await this.redisService.get(
      `refresh_token:${decoded.id}`,
    );
    if (redisToken === null) {
      throw new UnauthorizedException(AUTH_EXPIRED_TOKEN);
    }
    if (token !== redisToken) {
      throw new UnauthorizedException(AUTH_INVALID_TOKEN);
    }
    const user = await this.userRepository.findByEmail(decoded.email);
    return this.tokenService.generateAccessToken(user);
  }

  async socialLogin(
    socialUser: DomainReqSocialLoginDto,
  ): Promise<DomainResLoginDto> {
    const { email, provider } = socialUser;
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      return await this.login(user);
    } else {
      const user = { email, provider };
      const newUser = await this.userRepository.createUser(user);
      return await this.login(newUser);
    }
  }
}
