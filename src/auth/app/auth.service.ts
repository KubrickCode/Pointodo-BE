import {
  Injectable,
  Inject,
  Logger,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import {
  CHECK_PASSWORD_MESSAGE,
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
} from '@shared/messages/auth/auth.errors';
import { IAuthService } from '@auth/domain/interfaces/auth.service.interface';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
  ReqValidateUserAppDto,
  ResValidateUserAppDto,
} from '@auth/domain/dto/vaildateUser.app.dto';
import {
  ReqCheckPasswordAppDto,
  ResCheckPasswordAppDto,
} from '@auth/domain/dto/checkPassword.app.dto';
import { ReqLoginAppDto, ResLoginAppDto } from '@auth/domain/dto/login.app.dto';
import {
  ReqLogoutAppDto,
  ResLogoutAppDto,
} from '@auth/domain/dto/logout.app.dto';
import {
  ReqRefreshAppDto,
  ResRefreshAppDto,
} from '@auth/domain/dto/refresh.app.dto';
import { ReqSocialLoginAppDto } from '@auth/domain/dto/socialLogin.app.dto';
import {
  ReqValidateAdminAppDto,
  ResValidateAdminAppDto,
} from '@auth/domain/dto/validateAdmin.app.dto';
import { PasswordHasher } from '@shared/utils/passwordHasher';
import { USER_NOT_FOUND } from '@shared/messages/user/user.errors';
import { ICacheService } from '@cache/domain/interfaces/cache.service.interface';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { DEFAULT_BADGE_ID } from '@shared/constants/badge.constant';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
    @Inject('IRedisService')
    private readonly redisService: IRedisService,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserBadgeRepository')
    private readonly userBadgeRepository: IUserBadgeRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject('ICacheService')
    private readonly cacheService: ICacheService,
  ) {}

  async validateUser(
    req: ReqValidateUserAppDto,
  ): Promise<ResValidateUserAppDto> {
    const loginDto = plainToClass(ReqValidateUserAppDto, req);
    const validationErrors = await validate(loginDto);

    if (validationErrors.length > 0) {
      const message = validationErrors
        .map((err) => Object.values(err.constraints))
        .flat();
      throw new BadRequestException(message);
    }

    const user = await this.userRepository.findByEmail(req.email);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const userPassword = await this.userRepository.findPasswordById(user.id);

    const isCorrectPassword = await PasswordHasher.comparePassword(
      req.password,
      userPassword,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException(AUTH_INVALID_PASSWORD);
    }

    return user;
  }

  async checkPassword(
    req: ReqCheckPasswordAppDto,
  ): Promise<ResCheckPasswordAppDto> {
    const userPassword = await this.userRepository.findPasswordById(req.id);
    const isCorrectPassword = await PasswordHasher.comparePassword(
      req.password,
      userPassword,
    );
    if (!isCorrectPassword) {
      throw new UnauthorizedException(AUTH_INVALID_PASSWORD);
    }
    return { message: CHECK_PASSWORD_MESSAGE };
  }

  async login(req: ReqLoginAppDto): Promise<ResLoginAppDto> {
    const accessToken = this.tokenService.generateAccessToken(req);
    const refreshToken = this.tokenService.generateRefreshToken(req);
    await this.redisService.set(
      `refresh_token:${req.id}`,
      refreshToken,
      jwtExpiration.refreshTokenExpirationSeconds,
    );
    return { accessToken, refreshToken };
  }

  async logout(req: ReqLogoutAppDto): Promise<ResLogoutAppDto> {
    await this.redisService.delete(`refresh_token:${req.id}`);
    return { message: LOGOUT_SUCCESS_MESSAGE };
  }

  async refresh(req: ReqRefreshAppDto): Promise<ResRefreshAppDto> {
    const decoded = this.tokenService.decodeToken(req.refreshToken);
    if (!decoded || !decoded.id) {
      throw new UnauthorizedException(AUTH_INVALID_TOKEN);
    }
    const redisToken = await this.redisService.get(
      `refresh_token:${decoded.id}`,
    );

    if (redisToken === null) {
      this.logger.error(AUTH_EXPIRED_REFRESH_TOKEN);
      throw new UnauthorizedException(AUTH_EXPIRED_REFRESH_TOKEN);
    }
    if (req.refreshToken !== redisToken) {
      this.logger.error(AUTH_INVALID_TOKEN);
      throw new UnauthorizedException(AUTH_INVALID_TOKEN);
    }
    const user = await this.userRepository.findById(decoded.id);
    await this.cacheService.deleteCache(`user:${user.id}`);
    const accessToken = this.tokenService.generateAccessToken(user);
    return { accessToken };
  }

  async socialLogin(socialUser: ReqSocialLoginAppDto): Promise<ResLoginAppDto> {
    const { email, provider } = socialUser;
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      return await this.login(user);
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
      return await this.login(newUser);
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
