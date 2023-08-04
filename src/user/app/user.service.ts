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
} from '@shared/messages/user/user.messages';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from '@shared/messages/user/user.errors';
import { IUserService } from '@user/domain/interfaces/user.service.interface';
import { ICacheService } from 'src/cache/domain/interfaces/cache.service.interface';
import { UserEntity } from '@user/domain/entities/user.entity';
import { cacheConfig } from '@shared/config/cache.config';
import { ConfigService } from '@nestjs/config';
import {
  ReqRegisterAppDto,
  ResRegisterAppDto,
} from '@user/domain/dto/register.app.dto';
import {
  ReqGetUserAppDto,
  ResGetUserAppDto,
} from '@user/domain/dto/getUser.app.dto';
import {
  ReqChangePasswordAppDto,
  ResChangePasswordAppDto,
} from '@user/domain/dto/changePassword.app.dto';
import {
  ReqDeleteUserAppDto,
  ResDeleteUserAppDto,
} from '@user/domain/dto/deleteUser.app.dto';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/badgeProgress.repository.interface';
import { initialUserBadgeProgress } from '@shared/utils/initialUserBadgeProgress';
import { PasswordHasher } from '@shared/utils/passwordHasher';
import { ITransaction } from '@shared/interfaces/transaction.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IBadgeProgressRepository')
    private readonly badgeProgressRepository: IBadgeProgressRepository,
    @Inject('ICacheService')
    private readonly cacheService: ICacheService,
    private readonly configService: ConfigService,
    @Inject('ITransaction')
    private readonly transaction: ITransaction,
  ) {}

  async register(newUser: ReqRegisterAppDto): Promise<ResRegisterAppDto> {
    await this.transaction.beginTransaction();
    try {
      const { email, password } = newUser;

      const existingUser = await this.userRepository.findByEmail(email);

      if (existingUser) {
        throw new ConflictException(USER_ALREADY_EXISTS);
      }

      const hashedPassword = await PasswordHasher.hashPassword(password);

      const createdUser = await this.userRepository.createUser(
        email,
        hashedPassword,
      );

      for (const badgeType of initialUserBadgeProgress) {
        await this.badgeProgressRepository.createBadgeProgress(
          createdUser.id,
          badgeType,
        );
      }

      this.logger.log(
        'info',
        `가입 이메일:${createdUser.email}, 사용자 ID:${createdUser.id}, 가입 일시:${createdUser.createdAt}, 공급 업체:${createdUser.provider}`,
      );
      await this.transaction.commitTransaction();
      return { message: REGISTER_SUCCESS_MESSAGE };
    } catch (error) {
      await this.transaction.rollbackTransaction();
      throw error;
    }
  }

  async getUser(req: ReqGetUserAppDto): Promise<ResGetUserAppDto> {
    const cacheKey = `user:${req.id}`;
    const cachedUser = await this.cacheService.getFromCache<UserEntity>(
      cacheKey,
    );
    if (cachedUser) return cachedUser;

    const user = await this.userRepository.findById(req.id);
    if (user === null) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    await this.cacheService.setCache(
      cacheKey,
      user,
      cacheConfig(this.configService).cacheTTL,
    );
    return user;
  }

  async changePassword(
    req: ReqChangePasswordAppDto,
  ): Promise<ResChangePasswordAppDto> {
    const newPassword = await PasswordHasher.hashPassword(req.password);
    await this.userRepository.changePassword(req.id, newPassword);
    this.logger.log('info', `비밀번호 변경 - 사용자 ID:${req.id}`);
    return { message: CHANGE_PASSWORD_SUCCESS_MESSAGE };
  }

  async deleteUser(req: ReqDeleteUserAppDto): Promise<ResDeleteUserAppDto> {
    const user = await this.userRepository.deleteUser(req.id);
    await this.cacheService.deleteCache(`user:${req.id}`);
    this.logger.log(
      'info',
      `회원 탈퇴 - 사용자 ID:${user.id}, 유저 이메일:${user.email}`,
    );
    return { message: DELETE_USER_SUCCESS_MESSAGE };
  }
}
