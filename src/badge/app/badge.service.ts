import { BadgeEntity } from '@admin/badge/domain/entities/badge.entity';
import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import { ReqBuyBadgeAppDto } from '@badge/domain/dto/buyBadge.app.dto';
import { ReqChangeSelectedBadgeAppDto } from '@badge/domain/dto/changeSelectedBadge.app.dto';
import { ReqDeleteUserBadgeAppDto } from '@badge/domain/dto/deleteUserBadge.app.dto';
import {
  ReqGetAllBadgeProgressAppDto,
  ResGetAllBadgeProgressAppDto,
} from '@badge/domain/dto/getAllBadgeProgress.app.dto';
import {
  ReqGetUserBadgeListAppDto,
  ResGetUserBadgeListAppDto,
} from '@badge/domain/dto/getUserBadgeList.app.dto';
import {
  ReqGetUserBadgeListWithNameAppDto,
  ResGetUserBadgeListWithNameAppDto,
} from '@badge/domain/dto/getUserBadgeListWithName.app.dto';
import { ReqPutBadgeToUserAppDto } from '@badge/domain/dto/putBadgeToUser.app.dto';
import { IBadgeService } from '@badge/domain/interfaces/badge.service.interface';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/badgeProgress.repository.interface';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { IUserBadgeTransactionRepository } from '@badge/domain/interfaces/userBadge.tx.repository.interface';
import { ICacheService } from '@cache/domain/interfaces/cache.service.interface';
import {
  ConflictException,
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import { IRedisService } from '@redis/domain/interfaces/redis.service.interface';
import { cacheConfig } from '@shared/config/cache.config';
import { DEFAULT_BADGE_ID } from '@shared/constants/badge.constant';
import {
  IBADGE_ADMIN_REPOSITORY,
  IBADGE_PROGRESS_REPOSITORY,
  ICACHE_SERVICE,
  IPOINT_REPOSITORY,
  IREDIS_SERVICE,
  IUSER_BADGE_REPOSITORY,
  IUSER_BADGE_TRANSACTION_REPOSITORY,
  IUSER_REPOSITORY,
} from '@shared/constants/provider.constant';
import {
  ALREADY_EXIST_USER_BADGE,
  BUY_BADGE_CONFLICT_POINTS,
  CANT_DELETE_DEAFULT_BADGE,
  NOT_EXIST_USER_BADGE,
} from '@shared/messages/badge/badge.errors';
import {
  BUY_BADGE_SUCCESS_MESSAGE,
  CHANGE_USER_BADGE_MESSAGE,
  DELETE_USER_BADGE_SUCCESS_MESSAGE,
  PUT_BADGE_SUCCESS_MESSAGE,
} from '@shared/messages/badge/badge.messages';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import { plainToClass } from 'class-transformer';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class BadgeService implements IBadgeService {
  constructor(
    @Inject(IPOINT_REPOSITORY)
    private readonly pointRepository: IPointRepository,
    @Inject(IUSER_BADGE_REPOSITORY)
    private readonly userBadgeRepository: IUserBadgeRepository,
    @Inject(IUSER_BADGE_TRANSACTION_REPOSITORY)
    private readonly userBadgeTxRepository: IUserBadgeTransactionRepository,
    @Inject(IBADGE_ADMIN_REPOSITORY)
    private readonly badgeAdminRepository: IBadgeAdminRepository,
    @Inject(IUSER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(IBADGE_PROGRESS_REPOSITORY)
    private readonly badgeProgressRepository: IBadgeProgressRepository,
    @Inject(IREDIS_SERVICE)
    private readonly redisService: IRedisService,
    @Inject(ICACHE_SERVICE)
    private readonly cacheService: ICacheService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async buyBadge(req: ReqBuyBadgeAppDto): Promise<void> {
    const { userId, badgeId } = req;

    const badgeLogId = await this.userBadgeTxRepository.buyBadge(
      userId,
      badgeId,
    );

    const userPoints = await this.pointRepository.calculateUserPoints(userId);
    if (userPoints < 0) {
      await this.userBadgeRepository.deleteUserBadgeLog(badgeLogId);
      throw new ConflictException(BUY_BADGE_CONFLICT_POINTS);
    }

    await this.cacheService.deleteCache(`userBadgeList:${userId}`);
    await this.redisService.deleteKeysByPrefix(
      `userSpentPointsLogs:${userId}*`,
    );
    await this.cacheService.deleteCache(`SPENTtotalPointPages:${userId}`);

    this.logger.log(
      'info',
      `${BUY_BADGE_SUCCESS_MESSAGE}-유저 ID:${userId}, 뱃지 ID:${badgeId}`,
    );
  }

  async getUserBadgeList(
    req: ReqGetUserBadgeListAppDto,
  ): Promise<ResGetUserBadgeListAppDto[]> {
    const cacheKey = `userBadgeList:${req.userId}`;
    const cachedBadgeList = await this.cacheService.getFromCache<
      ResGetUserBadgeListAppDto[]
    >(cacheKey);
    if (cachedBadgeList) {
      return cachedBadgeList.map((item) =>
        plainToClass(ResGetUserBadgeListAppDto, item),
      );
    }

    const response = await this.userBadgeRepository.getUserBadgeList(
      req.userId,
    );
    const result = response.map((item) =>
      plainToClass(ResGetUserBadgeListAppDto, item),
    );

    await this.cacheService.setCache(
      cacheKey,
      result,
      cacheConfig(this.configService).cacheTTL,
    );

    return result;
  }

  async getUserBadgeListWithName(
    req: ReqGetUserBadgeListWithNameAppDto,
  ): Promise<ResGetUserBadgeListWithNameAppDto[]> {
    return await this.userBadgeRepository.getUserBadgeListWithName(req.userId);
  }

  async changeSelectedBadge(req: ReqChangeSelectedBadgeAppDto): Promise<void> {
    const { userId, badgeId } = req;
    const userBadgeList = await this.userBadgeRepository.getUserBadgeList(
      userId,
    );

    const badgeTypeList = userBadgeList.map((item) => item.badgeId);

    if (!badgeTypeList.includes(badgeId))
      throw new BadRequestException(NOT_EXIST_USER_BADGE);

    await this.cacheService.deleteCache(`user:${userId}`);
    await this.userRepository.changeSelectedBadge(userId, badgeId);
    this.logger.log(
      'info',
      `${CHANGE_USER_BADGE_MESSAGE}-유저 ID:${userId}, 뱃지 ID:${badgeId}`,
    );
  }

  async getAllBadgeProgress(
    req: ReqGetAllBadgeProgressAppDto,
  ): Promise<ResGetAllBadgeProgressAppDto[]> {
    const result = await this.badgeProgressRepository.getAllBadgeProgress(
      req.userId,
    );
    return result.map((item) =>
      plainToClass(ResGetAllBadgeProgressAppDto, item),
    );
  }

  async getAllBadges(): Promise<BadgeEntity[]> {
    const cacheKey = `allBadges`;
    const cachedAllBadges = await this.cacheService.getFromCache<BadgeEntity[]>(
      cacheKey,
    );
    if (cachedAllBadges) {
      return cachedAllBadges;
    }
    const result = await this.badgeAdminRepository.getAllBadges();
    await this.cacheService.setCache(
      cacheKey,
      result,
      cacheConfig(this.configService).cacheTTL,
    );
    return result;
  }

  async putBadgeToUser(req: ReqPutBadgeToUserAppDto): Promise<void> {
    const { userId, badgeId } = req;
    const createdUserBadgeLog =
      await this.userBadgeRepository.createUserBadgeLog(userId, badgeId);
    const userBadgeList = await this.userBadgeRepository.getUserBadgeList(
      userId,
    );

    const filteredBadgeList = userBadgeList.filter(
      (item) => item.badgeId === badgeId,
    );

    if (filteredBadgeList.length > 1) {
      await this.userBadgeRepository.deleteUserBadgeLog(createdUserBadgeLog.id);
      throw new ConflictException(ALREADY_EXIST_USER_BADGE);
    }
    await this.cacheService.deleteCache(`userBadgeList:${userId}`);
    this.logger.log(
      'info',
      `${PUT_BADGE_SUCCESS_MESSAGE}-유저 ID:${userId},뱃지 ID:${badgeId}`,
    );
  }

  async deleteUserBadge(req: ReqDeleteUserBadgeAppDto): Promise<void> {
    const { userId, badgeId } = req;
    if (badgeId === DEFAULT_BADGE_ID)
      throw new BadRequestException(CANT_DELETE_DEAFULT_BADGE);
    await this.cacheService.deleteCache(`userBadgeList:${userId}`);
    await this.cacheService.deleteCache(`user:${userId}`);
    await this.cacheService.deleteCache(`SPENTtotalPointPages:${userId}`);
    await this.redisService.deleteKeysByPrefix(`userSpentPointsLogs:${userId}`);
    await this.userRepository.changeSelectedBadge(userId, DEFAULT_BADGE_ID);
    await this.userBadgeRepository.deleteUserBadge(badgeId, userId);
    this.logger.log(
      'info',
      `${DELETE_USER_BADGE_SUCCESS_MESSAGE}-유저 ID:${userId},뱃지 ID:${badgeId}`,
    );
  }
}
