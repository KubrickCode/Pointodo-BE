import {
  Inject,
  Injectable,
  Logger,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  CHANGE_PASSWORD_SUCCESS_MESSAGE,
  DELETE_USER_SUCCESS_MESSAGE,
  REGISTER_SUCCESS_MESSAGE,
} from '@shared/messages/user.messages';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IUserRepository } from '@domain/user/interfaces/user.repository.interface';
import { IPasswordHasher } from '@domain/user/interfaces/passwordHasher.interface';
import {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from '@domain/user/errors/user.errors';
import { IUserService } from '@domain/user/interfaces/user.service.interface';
import { ICacheService } from '@domain/cache/interfaces/cache.service.interface';
import { UserEntity } from '@domain/user/entities/user.entity';
import { cacheConfig } from '@shared/config/cache.config';
import { ConfigService } from '@nestjs/config';
import {
  ReqRegisterAppDto,
  ResRegisterAppDto,
} from '@domain/user/dto/app/register.app.dto';
import {
  ReqGetUserAppDto,
  ResGetUserAppDto,
} from '@domain/user/dto/app/getUser.app.dto';
import {
  ReqChangePasswordAppDto,
  ResChangePasswordAppDto,
} from '@domain/user/dto/app/changePassword.app.dto';
import {
  ReqDeleteUserAppDto,
  ResDeleteUserAppDto,
} from '@domain/user/dto/app/deleteUser.app.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
    @Inject('ICacheService')
    private readonly cacheRepository: ICacheService,
    private readonly configService: ConfigService,
  ) {}

  async register(newUser: ReqRegisterAppDto): Promise<ResRegisterAppDto> {
    const { email, password } = newUser;
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(USER_ALREADY_EXISTS);
    }

    const hashedPassword = await this.passwordHasher.hashPassword(password);

    const user = {
      email,
      password: hashedPassword,
    };

    const createdUser = await this.userRepository.createUser(user);
    this.logger.log(
      'info',
      `가입 이메일:${createdUser.email}, 사용자 ID:${createdUser.id}, 가입 일시:${createdUser.createdAt}, 공급 업체:${createdUser.provider}`,
    );
    return { message: REGISTER_SUCCESS_MESSAGE };
  }

  async getUser(req: ReqGetUserAppDto): Promise<ResGetUserAppDto> {
    const cacheKey = `get_user:${req.id}`;
    const cachedUser = await this.cacheRepository.getFromCache<UserEntity>(
      cacheKey,
    );
    if (cachedUser) {
      return cachedUser;
    }
    const user = await this.userRepository.findById(req.id);
    if (user === null) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    await this.cacheRepository.setCache(
      cacheKey,
      user,
      cacheConfig(this.configService).cacheTTL,
    );
    const { id, email, provider, role, defaultBadgeId, createdAt } = user;
    return { id, email, provider, role, defaultBadgeId, createdAt };
  }

  async changePassword(
    req: ReqChangePasswordAppDto,
  ): Promise<ResChangePasswordAppDto> {
    const newPassword = await this.passwordHasher.hashPassword(req.password);
    const user = await this.userRepository.changePassword(req.id, newPassword);
    this.logger.log(
      'info',
      `비밀번호 변경 - 사용자 ID:${user.id}, 유저 이메일:${user.email}`,
    );
    return { message: CHANGE_PASSWORD_SUCCESS_MESSAGE };
  }

  async deleteUser(req: ReqDeleteUserAppDto): Promise<ResDeleteUserAppDto> {
    const user = await this.userRepository.deleteUser(req.id);
    this.logger.log(
      'info',
      `회원 탈퇴 - 사용자 ID:${user.id}, 유저 이메일:${user.email}`,
    );
    return { message: DELETE_USER_SUCCESS_MESSAGE };
  }
}
