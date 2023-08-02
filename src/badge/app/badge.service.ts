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
import { IBadgeService } from '@badge/domain/interfaces/badge.service.interface';
import { IBadgeProgressRepository } from '@badge/domain/interfaces/badgeProgress.repository.interface';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import {
  ConflictException,
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import { ITransaction } from '@shared/interfaces/transaction.interface';
import {
  BUY_BADGE_CONFLICT_POINT,
  BUY_BADGE_LESS_POINT,
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
    @Inject('ITransaction')
    private readonly transaction: ITransaction,
  ) {}

  async buyBadge(req: ReqBuyBadgeAppDto): Promise<ResBuyBadgeAppDto> {
    await this.transaction.beginTransaction();
    try {
      const { userId, badgeType } = req;
      const price = await this.badgeAdminRepository.getBadgePrice(badgeType);
      const currentPoint = await this.pointRepository.calculateUserPoints(
        userId,
      );
      if (currentPoint - price < 0)
        throw new ConflictException(BUY_BADGE_LESS_POINT);

      await this.pointRepository.createPointLog(
        userId,
        'SPENT',
        `${badgeType} 구매`,
        -price,
      );
      await this.userBadgeRepository.createUserBadgeLog(userId, badgeType);

      const afterPoint = await this.pointRepository.calculateUserPoints(userId);

      if (afterPoint - price < 0)
        throw new ConflictException(BUY_BADGE_CONFLICT_POINT);

      await this.transaction.commitTransaction();
      return { message: BUY_BADGE_SUCCESS_MESSAGE };
    } catch (error) {
      await this.transaction.rollbackTransaction();
      throw error;
    }
  }

  async getUserBadgeList(
    req: ReqGetUserBadgeListAppDto,
  ): Promise<ResGetUserBadgeListAppDto[]> {
    return await this.userBadgeRepository.getUserBadgeList(req.userId);
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
    return await this.badgeProgressRepository.getAllBadgeProgress(req.userId);
  }
}
