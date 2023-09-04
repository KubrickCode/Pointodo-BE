import {
  Injectable,
  Inject,
  Logger,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import {
  CHECK_PASSWORD_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
  LOGOUT_SUCCESS_MESSAGE,
} from '@shared/messages/auth/auth.messages';
import { ITokenService } from '@auth/domain/interfaces/token.service.interface';
import { IRedisService } from '@redis/domain/interfaces/redis.service.interface';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { jwtExpiration } from '@shared/config/jwt.config';
import {
  AUTH_EXPIRED_REFRESH_TOKEN,
  AUTH_INVALID_ADMIN,
  AUTH_INVALID_PASSWORD,
  AUTH_INVALID_TOKEN,
  OTHER_DEVICE,
  OTHER_IP,
} from '@shared/messages/auth/auth.errors';
import { IAuthService } from '@auth/domain/interfaces/auth.service.interface';
import {
  ReqValidateUserAppDto,
  ResValidateUserAppDto,
} from '@auth/domain/dto/vaildateUser.app.dto';
import { ReqCheckPasswordAppDto } from '@auth/domain/dto/checkPassword.app.dto';
import { ReqLoginAppDto, ResLoginAppDto } from '@auth/domain/dto/login.app.dto';
import { ReqLogoutAppDto } from '@auth/domain/dto/logout.app.dto';
import {
  ReqRefreshAppDto,
  ResRefreshAppDto,
} from '@auth/domain/dto/refresh.app.dto';
import {
  ReqSocialLoginAppDto,
  ResSocialLoginAppDto,
} from '@auth/domain/dto/socialLogin.app.dto';
import {
  ReqValidateAdminAppDto,
  ResValidateAdminAppDto,
} from '@auth/domain/dto/validateAdmin.app.dto';
import {
  USER_EXIST_WITH_SOCIAL,
  USER_NOT_FOUND,
} from '@shared/messages/user/user.errors';
import { ICacheService } from '@cache/domain/interfaces/cache.service.interface';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { DEFAULT_BADGE_ID } from '@shared/constants/badge.constant';
import { IPasswordHasher } from '@shared/interfaces/IPasswordHasher';
import {
  ICACHE_SERVICE,
  IPASSWORD_HASHER,
  IREDIS_SERVICE,
  ITOKEN_SERVICE,
  IUSER_BADGE_REPOSITORY,
  IUSER_REPOSITORY,
} from '@shared/constants/provider.constant';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(ITOKEN_SERVICE)
    private readonly tokenService: ITokenService,
    @Inject(IREDIS_SERVICE)
    private readonly redisService: IRedisService,
    @Inject(IUSER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(IUSER_BADGE_REPOSITORY)
    private readonly userBadgeRepository: IUserBadgeRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject(ICACHE_SERVICE)
    private readonly cacheService: ICacheService,
    @Inject(IPASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async validateUser(
    req: ReqValidateUserAppDto,
  ): Promise<ResValidateUserAppDto> {
    const user = await this.userRepository.findByEmail(req.email);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    if (user.provider !== 'LOCAL')
      throw new ConflictException(USER_EXIST_WITH_SOCIAL);

    const userPassword = await this.userRepository.findPasswordById(user.id);

    const isCorrectPassword = await this.passwordHasher.comparePassword(
      req.password,
      userPassword,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException(AUTH_INVALID_PASSWORD);
    }

    return user;
  }

  async checkPassword(req: ReqCheckPasswordAppDto): Promise<void> {
    const userPassword = await this.userRepository.findPasswordById(req.id);
    if (userPassword === null) {
      throw new ConflictException(USER_EXIST_WITH_SOCIAL);
    }
    const isCorrectPassword = await this.passwordHasher.comparePassword(
      req.password,
      userPassword,
    );
    if (!isCorrectPassword) {
      throw new UnauthorizedException(AUTH_INVALID_PASSWORD);
    }
    this.logger.log('info', `${CHECK_PASSWORD_MESSAGE}-user:${req.id}`);
  }

  async login(req: ReqLoginAppDto): Promise<ResLoginAppDto> {
    const accessToken = this.tokenService.generateAccessToken(req);
    const refreshToken = this.tokenService.generateRefreshToken(req);
    const { ip, device } = req;
    await this.redisService.set(
      `refresh_token:${req.id}`,
      { refreshToken, ip, device },
      jwtExpiration.refreshTokenExpirationSeconds,
    );
    this.logger.log('info', `${LOGIN_SUCCESS_MESSAGE}-유저 ID:${req.id}`);
    return plainToClass(ResLoginAppDto, { accessToken, refreshToken });
  }

  async logout(req: ReqLogoutAppDto): Promise<void> {
    await this.redisService.delete(`refresh_token:${req.id}`);
    await this.cacheService.deleteCache(`user:${req.id}`);
    this.logger.log('info', `${LOGOUT_SUCCESS_MESSAGE}-유저 ID:${req.id}`);
  }

  async refresh(req: ReqRefreshAppDto): Promise<ResRefreshAppDto> {
    const decoded = this.tokenService.decodeToken(req.refreshToken);
    if (!decoded || !decoded.id) {
      throw new UnauthorizedException(AUTH_INVALID_TOKEN);
    }
    const redisRefreshInfo = await this.redisService.get(
      `refresh_token:${decoded.id}`,
    );

    if (redisRefreshInfo === null) {
      this.logger.error(AUTH_EXPIRED_REFRESH_TOKEN);
      throw new UnauthorizedException(AUTH_EXPIRED_REFRESH_TOKEN);
    }
    if (req.refreshToken !== redisRefreshInfo.refreshToken) {
      this.logger.error(AUTH_INVALID_TOKEN);
      throw new UnauthorizedException(AUTH_INVALID_TOKEN);
    }
    if (req.ip !== redisRefreshInfo.ip) {
      this.logger.error(OTHER_IP);
      throw new UnauthorizedException(OTHER_IP);
    }
    if (req.device !== redisRefreshInfo.device) {
      this.logger.error(OTHER_DEVICE);
      throw new UnauthorizedException(OTHER_DEVICE);
    }
    const user = await this.userRepository.findById(decoded.id);
    const accessToken = this.tokenService.generateAccessToken(user);
    this.logger.log('info', `리프레시 토큰 검증 완료-유저 ID:${user.id}`);
    return { accessToken };
  }

  async socialLogin(
    socialUser: ReqSocialLoginAppDto,
  ): Promise<ResSocialLoginAppDto> {
    const { email, provider } = socialUser;
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      return plainToClass(ResSocialLoginAppDto, { id: user.id });
    } else {
      const newUser = await this.userRepository.createUser(
        email,
        null,
        provider,
      );
      await this.userBadgeRepository.createUserBadgeLog(
        newUser.id,
        DEFAULT_BADGE_ID,
      );
      return plainToClass(ResSocialLoginAppDto, { id: newUser.id });
    }
  }

  async validateAdmin(
    req: ReqValidateAdminAppDto,
  ): Promise<ResValidateAdminAppDto> {
    const { id } = req;
    const user = await this.userRepository.findById(id);
    if (user.role !== 'ADMIN' && user.role !== 'MASTER') {
      throw new ForbiddenException(AUTH_INVALID_ADMIN);
    }
    return { validation: true };
  }
}
