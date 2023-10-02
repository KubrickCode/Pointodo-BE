import {
  Inject,
  Injectable,
  Logger,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UserMessage } from '@shared/messages/user/User.messages';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IUserRepository } from '@user/domain/interfaces/User.repository.interface';
import { UserErrorMessage } from '@shared/messages/user/User.errors';
import { IUserService } from '@user/domain/interfaces/User.service.interface';
import { ICacheService } from '@cache/domain/interfaces/Cache.service.interface';
import { cacheConfig } from '@shared/config/Cache.config';
import { ConfigService } from '@nestjs/config';
import { ReqRegisterAppDto } from '@user/domain/dto/Register.app.dto';
import {
  ReqGetUserAppDto,
  ResGetUserAppDto,
} from '@user/domain/dto/GetUser.app.dto';
import { ReqDeleteUserAppDto } from '@user/domain/dto/DeleteUser.app.dto';
import { IUserBadgeRepository } from '@badge/domain/interfaces/UserBadge.repository.interface';
import { IRedisService } from '@redis/domain/interfaces/Redis.service.interface';
import {
  ReqGetUserListAppDto,
  ResGetUserListAppDto,
} from '@user/domain/dto/GetUserList.app.dto';
import {
  ReqGetTotalUserListPagesAppDto,
  ResGetTotalUserListPagesAppDto,
} from '@user/domain/dto/GetTotalUserListPages.app.dto';
import { BadgeConstant } from '@shared/constants/Badge.constant';
import { IPasswordHasher } from '@shared/interfaces/IPasswordHasher';
import { plainToClass } from 'class-transformer';
import { ReqUpdateUserAppDto } from '@user/domain/dto/UpdateUser.app.dto';
import { ProviderConstant } from '@shared/constants/Provider.constant';
import {
  ReqGetTopUsersOnDateAppDto,
  ResGetTopUsersOnDateAppDto,
} from '@user/domain/dto/GetTopUsersOnDate.app.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject(ProviderConstant.IUSER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ProviderConstant.IUSER_BADGE_REPOSITORY)
    private readonly userBadgeRepository: IUserBadgeRepository,
    @Inject(ProviderConstant.IREDIS_SERVICE)
    private readonly redisService: IRedisService,
    @Inject(ProviderConstant.ICACHE_SERVICE)
    private readonly cacheService: ICacheService,
    @Inject(ProviderConstant.IPASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
    private readonly configService: ConfigService,
  ) {}

  async register(newUser: ReqRegisterAppDto): Promise<void> {
    const { email, password } = newUser;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(UserErrorMessage.USER_ALREADY_EXIST);
    }

    const hashedPassword = await this.passwordHasher.hashPassword(password);

    const createdUser = await this.userRepository.createUser(
      email,
      hashedPassword,
    );

    await this.userBadgeRepository.createUserBadgeLog(
      createdUser.id,
      BadgeConstant.DEFAULT_BADGE_ID,
    );

    this.logger.log(
      'info',
      `${UserMessage.REGISTER_SUCCESS_MESSAGE}-가입 이메일:${createdUser.email}, 유저 ID:${createdUser.id}, 가입 일시:${createdUser.createdAt}`,
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
      throw new NotFoundException(UserErrorMessage.USER_NOT_FOUND);
    }

    const result = {
      ...user,
      iconLink: user.selectedBadge.iconLink,
    };

    await this.cacheService.setCache(
      cacheKey,
      result,
      cacheConfig(this.configService).cacheTTL,
    );
    return plainToClass(ResGetUserAppDto, result);
  }

  async updateUser(req: ReqUpdateUserAppDto): Promise<void> {
    const newPassword = await this.passwordHasher.hashPassword(req.password);
    await this.userRepository.changePassword(req.id, newPassword);
    this.logger.log(
      'info',
      `${UserMessage.CHANGE_PASSWORD_SUCCESS_MESSAGE}-유저 ID:${req.id}`,
    );
  }

  async deleteUser(req: ReqDeleteUserAppDto): Promise<void> {
    const user = await this.userRepository.deleteUser(req.id);
    await this.redisService.delete(`refresh_token:${req.id}`);
    await this.cacheService.deleteCache(`user:${req.id}`);
    await this.cacheService.deleteCache(`userSpentPointsLogs:${req.id}`);
    await this.cacheService.deleteCache(`userBadgeList:${req.id}`);
    await this.cacheService.deleteCache(`SPENTtotalPointPages:${req.id}`);
    this.logger.log(
      'info',
      `${UserMessage.DELETE_USER_SUCCESS_MESSAGE}-유저 ID:${user.id}`,
    );
  }

  async getUserList(
    req: ReqGetUserListAppDto,
  ): Promise<ResGetUserListAppDto[]> {
    const { order, offset, limit, provider } = req;
    return await this.userRepository.getUserList(
      order,
      limit,
      (offset - 1) * limit,
      provider,
    );
  }

  async getTotalUserListPages(
    req: ReqGetTotalUserListPagesAppDto,
  ): Promise<ResGetTotalUserListPagesAppDto> {
    const { provider, limit } = req;
    const totalUsers = await this.userRepository.getTotalUserListPages(
      provider,
    );
    return { totalPages: Math.ceil(totalUsers / limit) };
  }

  async getTopUsersOnDate(
    req: ReqGetTopUsersOnDateAppDto,
  ): Promise<ResGetTopUsersOnDateAppDto[]> {
    const result = await this.userRepository.getTopUsersOnDate(
      req.startDate,
      req.endDate,
    );
    return result.map((item) => plainToClass(ResGetTopUsersOnDateAppDto, item));
  }
}