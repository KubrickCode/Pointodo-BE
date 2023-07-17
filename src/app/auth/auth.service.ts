import {
  Injectable,
  Inject,
  Logger,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserEntity } from '@domain/user/entities/user.entity';
import { ResLogoutDto } from '../../interface/dto/auth/logout.dto';
import {
  CHECK_PASSWORD_MESSAGE,
  LOGOUT_SUCCESS_MESSAGE,
} from '../../shared/messages/auth.messages';
import { DomainResLoginDto } from '@domain/auth/dto/login.dto';
import { ITokenService } from '@domain/auth/interfaces/token.service.interface';
import { IRedisService } from '@domain/redis/interfaces/redis.service.interface';
import { IUserRepository } from '@domain/user/interfaces/user.repository.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { jwtExpiration } from 'src/shared/config/jwt.config';
import {
  AUTH_EXPIRED_REFRESH_TOKEN,
  AUTH_INVALID_TOKEN,
} from '@domain/auth/errors/auth.errors';
import { DomainReqSocialLoginDto } from '@domain/auth/dto/socialLogin.dto';
import { IAuthService } from '@domain/auth/interfaces/auth.service.interface';
import { IPasswordHasher } from '@domain/user/interfaces/passwordHasher.interface';
import { ResCheckPasswordDto } from 'src/interface/dto/auth/checkPassword.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ReqLoginDto } from 'src/interface/dto/auth/login.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
    @Inject('IRedisService')
    private readonly redisService: IRedisService,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const loginDto = plainToClass(ReqLoginDto, { email, password });
    const validationErrors = await validate(loginDto);

    if (validationErrors.length > 0) {
      const message = validationErrors
        .map((err) => Object.values(err.constraints))
        .flat();
      throw new BadRequestException(message);
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('존재하지 않는 계정입니다');
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

  async checkPassword(
    id: string,
    password: string,
  ): Promise<ResCheckPasswordDto> {
    const user = await this.userRepository.findById(id);
    const isCorrectPassword = await this.passwordHasher.comparePassword(
      password,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다');
    }
    return { message: CHECK_PASSWORD_MESSAGE };
  }

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
    if (token !== redisToken) {
      this.logger.error(AUTH_INVALID_TOKEN);
      throw new UnauthorizedException(AUTH_INVALID_TOKEN);
    }
    const user = await this.userRepository.findById(decoded.id);
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
