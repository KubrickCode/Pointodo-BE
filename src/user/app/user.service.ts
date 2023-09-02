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
  USER_ALREADY_EXIST,
  USER_NOT_FOUND,
} from '@shared/messages/user/user.errors';
import { IUserService } from '@user/domain/interfaces/user.service.interface';
import { ICacheService } from 'src/cache/domain/interfaces/cache.service.interface';
import { cacheConfig } from '@shared/config/cache.config';
import { ConfigService } from '@nestjs/config';
import { ReqRegisterAppDto } from '@user/domain/dto/register.app.dto';
import {
  ReqGetUserAppDto,
  ResGetUserAppDto,
} from '@user/domain/dto/getUser.app.dto';
import {
  ReqDeleteUserAppDto,
  ResDeleteUserAppDto,
} from '@user/domain/dto/deleteUser.app.dto';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { IRedisService } from '@redis/domain/interfaces/redis.service.interface';
import {
  ReqGetUserListAppDto,
  ResGetUserListAppDto,
} from '@user/domain/dto/getUserList.app.dto';
import { GET_USER_LIST_LIMIT } from '@shared/constants/user.constant';
import {
  ReqGetTotalUserListPagesAppDto,
  ResGetTotalUserListPagesAppDto,
} from '@user/domain/dto/getTotalUserListPages.app.dto';
import { DEFAULT_BADGE_ID } from '@shared/constants/badge.constant';
import { IPasswordHasher } from '@shared/interfaces/IPasswordHasher';
import { plainToClass } from 'class-transformer';
import { ReqUpdateUserAppDto } from '@user/domain/dto/updateUser.app.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserBadgeRepository')
    private readonly userBadgeRepository: IUserBadgeRepository,
    @Inject('IRedisService')
    private readonly redisService: IRedisService,
    @Inject('ICacheService')
    private readonly cacheService: ICacheService,
    private readonly configService: ConfigService,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async register(newUser: ReqRegisterAppDto): Promise<void> {
    const { email, password } = newUser;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(USER_ALREADY_EXIST);
    }

    const hashedPassword = await this.passwordHasher.hashPassword(password);

    const createdUser = await this.userRepository.createUser(
      email,
      hashedPassword,
    );

    await this.userBadgeRepository.createUserBadgeLog(
      createdUser.id,
      DEFAULT_BADGE_ID,
    );

    this.logger.log(
      'info',
      `${REGISTER_SUCCESS_MESSAGE}-가입 이메일:${createdUser.email}, 사용자 ID:${createdUser.id}, 가입 일시:${createdUser.createdAt}, 공급 업체:${createdUser.provider}`,
    );
  }

  async getUser(req: ReqGetUserAppDto): Promise<ResGetUserAppDto> {
    const cacheKey = `user:${req.id}`;
    const cachedUser = await this.cacheService.getFromCache<ResGetUserAppDto>(
      cacheKey,
    );
    if (cachedUser) return plainToClass(ResGetUserAppDto, cachedUser);

    const user = await this.userRepository.findById(req.id);
    if (user === null) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    await this.cacheService.setCache(
      cacheKey,
      user,
      cacheConfig(this.configService).cacheTTL,
    );
    return plainToClass(ResGetUserAppDto, user);
  }

  async updateUser(req: ReqUpdateUserAppDto): Promise<void> {
    const newPassword = await this.passwordHasher.hashPassword(req.password);
    await this.userRepository.changePassword(req.id, newPassword);
    this.logger.log(
      'info',
      `${CHANGE_PASSWORD_SUCCESS_MESSAGE}-유저ID:${req.id}`,
    );
  }

  async deleteUser(req: ReqDeleteUserAppDto): Promise<ResDeleteUserAppDto> {
    const user = await this.userRepository.deleteUser(req.id);
    await this.redisService.delete(`refresh_token:${req.id}`);
    await this.cacheService.deleteCache(`user:${req.id}`);
    await this.cacheService.deleteCache(`userSpentPointsLogs:${req.id}`);
    await this.cacheService.deleteCache(`userBadgeList:${req.id}`);
    await this.cacheService.deleteCache(`SPENTtotalPointPages:${req.id}`);
    this.logger.log(
      'info',
      `회원 탈퇴 - 사용자 ID:${user.id}, 유저 이메일:${user.email}`,
    );
    return { message: DELETE_USER_SUCCESS_MESSAGE };
  }

  async getUserList(
    req: ReqGetUserListAppDto,
  ): Promise<ResGetUserListAppDto[]> {
    const { order, page, provider } = req;
    return await this.userRepository.getUserList(
      order,
      GET_USER_LIST_LIMIT,
      (page - 1) * GET_USER_LIST_LIMIT,
      provider,
    );
  }

  async getTotalUserListPages(
    req: ReqGetTotalUserListPagesAppDto,
  ): Promise<ResGetTotalUserListPagesAppDto> {
    const { provider } = req;
    const totalUsers = await this.userRepository.getTotalUserListPages(
      provider,
    );
    return { totalPages: Math.ceil(totalUsers / GET_USER_LIST_LIMIT) };
  }
}
