import {
  Injectable,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '@domain/user/entities/user.entity';
import { ResLogoutDto } from '../../interface/dto/auth/logout.dto';
import { LOGOUT_SUCCESS_MESSAGE } from '../../shared/messages/auth.messages';
import { DomainResLoginDto } from '@domain/auth/dto/login.dto';
import { ITokenService } from '@domain/auth/interfaces/token.service.interface';
import { IRedisService } from '@domain/redis/interfaces/iredis.service';
import { IUserRepository } from '@domain/user/interfaces/user.repository.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { jwtExpiration } from 'src/shared/config/jwt.config';
import {
  AUTH_EXPIRED_REFRESH_TOKEN,
  AUTH_INVALID_TOKEN,
} from '@domain/auth/errors/auth.errors';
import { DomainReqSocialLoginDto } from '@domain/auth/dto/socialLogin.dto';
import { IAuthService } from '@domain/auth/interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
    @Inject('IRedisService')
    private readonly redisService: IRedisService,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
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

  async logout(user: UserEntity): Promise<ResLogoutDto> {
    await this.redisService.delete(`refresh_token:${user.id}`);
    return { message: LOGOUT_SUCCESS_MESSAGE };
  }

  async refresh(token: string): Promise<string> {
    const decoded = this.tokenService.decodeToken(token);
    if (!decoded || !decoded.id || !decoded.email) {
      throw new UnauthorizedException(AUTH_INVALID_TOKEN);
    }
    const redisToken = await this.redisService.get(
      `refresh_token:${decoded.id}`,
    );

    if (redisToken === null) {
      this.logger.error(AUTH_EXPIRED_REFRESH_TOKEN);
      throw new UnauthorizedException(AUTH_EXPIRED_REFRESH_TOKEN);
    }
    if (token !== redisToken) {
      this.logger.error(AUTH_INVALID_TOKEN);
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
