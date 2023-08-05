import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import {
  ReqBuyBadgeAppDto,
  ResBuyBadgeAppDto,
} from '@badge/domain/dto/buyBadge.app.dto';
import {
  ReqChangeSelectedBadgeAppDto,
  ResChangeSelectedBadgeAppDto,
} from '@badge/domain/dto/changeSelectedBadge.app.dto';
import {
  ReqGetAllBadgeProgressAppDto,
  ResGetAllBadgeProgressAppDto,
} from '@badge/domain/dto/getAllBadgeProgress.app.dto';
import {
  ReqGetUserBadgeListAppDto,
  ResGetUserBadgeListAppDto,
} from '@badge/domain/dto/getUserBadgeList.app.dto';
import { BadgeProgressEntity } from '@badge/domain/entities/badgeProgress.entity';
import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';
import { IBadgeService } from '@badge/domain/interfaces/badge.service.interface';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/badgeProgress.repository.interface';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { ICacheService } from '@cache/domain/interfaces/cache.service.interface';
import {
  ConflictException,
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import { cacheConfig } from '@shared/config/cache.config';
import {
  ALREADY_EXIST_USER_BADGE,
  BUY_BADGE_CONFLICT_POINTS,
  BUY_BADGE_LESS_POINTS,
  NOT_EXIST_USER_BADGE,
} from '@shared/messages/badge/badge.errors';
import {
  BUY_BADGE_SUCCESS_MESSAGE,
  CHANGE_USER_BADGE_MESSAGE,
} from '@shared/messages/badge/badge.messages';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';

@Injectable()
export class BadgeService implements IBadgeService {
  constructor(
    @Inject('IPointRepository')
    private readonly pointRepository: IPointRepository,
    @Inject('IUserBadgeRepository')
    private readonly userBadgeRepository: IUserBadgeRepository,
    @Inject('IBadgeAdminRepository')
    private readonly badgeAdminRepository: IBadgeAdminRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IBadgeProgressRepository')
    private readonly badgeProgressRepository: IBadgeProgressRepository,
    @Inject('ICacheService')
    private readonly cacheService: ICacheService,
    private readonly configService: ConfigService,
  ) {}

  async buyBadge(req: ReqBuyBadgeAppDto): Promise<ResBuyBadgeAppDto> {
    const { userId, badgeType } = req;
    const price = await this.badgeAdminRepository.getBadgePrice(badgeType);
    const currentPoint = await this.pointRepository.calculateUserPoints(userId);
    if (currentPoint - price < 0)
      throw new ConflictException(BUY_BADGE_LESS_POINTS);

    await this.pointRepository.createPointLog(
      userId,
      'SPENT',
      `${badgeType} 구매`,
      -price,
    );

    await this.cacheService.deleteCache(`userBadgeList:${req.userId}`);
    await this.cacheService.deleteCache(`userPointsLogs:${req.userId}`);
    await this.cacheService.deleteCache(`userCurrentPoints:${req.userId}`);

    await this.userBadgeRepository.createUserBadgeLog(userId, badgeType);

    const afterPoint = await this.pointRepository.calculateUserPoints(userId);
    const userBadgeList = await this.userBadgeRepository.getUserBadgeList(
      userId,
    );

    const filteredBadgeList = userBadgeList.filter(
      (item) => item.badgeType === badgeType,
    );

    if (filteredBadgeList.length > 1)
      throw new ConflictException(ALREADY_EXIST_USER_BADGE);

    if (afterPoint < 0) throw new ConflictException(BUY_BADGE_CONFLICT_POINTS);

    return { message: BUY_BADGE_SUCCESS_MESSAGE };
  }

  async getUserBadgeList(
    req: ReqGetUserBadgeListAppDto,
  ): Promise<ResGetUserBadgeListAppDto[]> {
    const cacheKey = `userBadgeList:${req.userId}`;
    const cachedBadgeList = await this.cacheService.getFromCache<
      UserBadgeEntity[]
    >(cacheKey);
    if (cachedBadgeList) {
      return cachedBadgeList;
    }

    const result = await this.userBadgeRepository.getUserBadgeList(req.userId);

    await this.cacheService.setCache(
      cacheKey,
      result,
      cacheConfig(this.configService).cacheTTL,
    );

    return result;
  }

  async changeSelectedBadge(
    req: ReqChangeSelectedBadgeAppDto,
  ): Promise<ResChangeSelectedBadgeAppDto> {
    const { userId, badgeType } = req;
    const userBadgeList = await this.userBadgeRepository.getUserBadgeList(
      userId,
    );

    const badgeTypeList = userBadgeList.map((item) => item.badgeType);

    if (!badgeTypeList.includes(badgeType))
      throw new BadRequestException(NOT_EXIST_USER_BADGE);

    await this.userRepository.changeSelectedBadge(userId, badgeType);
    return { message: CHANGE_USER_BADGE_MESSAGE };
  }

  async getAllBadgeProgress(
    req: ReqGetAllBadgeProgressAppDto,
  ): Promise<ResGetAllBadgeProgressAppDto[]> {
    const cacheKey = `userBadgeProgress:${req.userId}`;
    const cachedBadgeProgress = await this.cacheService.getFromCache<
      BadgeProgressEntity[]
    >(cacheKey);
    if (cachedBadgeProgress) {
      return cachedBadgeProgress;
    }
    const result = await this.badgeProgressRepository.getAllBadgeProgress(
      req.userId,
    );
    await this.cacheService.setCache(
      cacheKey,
      result,
      cacheConfig(this.configService).cacheTTL,
    );
    return result;
  }
}
