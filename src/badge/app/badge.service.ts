import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import {
  ReqBuyBadgeAppDto,
  ResBuyBadgeAppDto,
} from '@badge/domain/dto/buyBadge.app.dto';
import { IBadgeService } from '@badge/domain/interfaces/badge.service.interface';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import { ITransaction } from '@shared/interfaces/transaction.interface';

@Injectable()
export class BadgeService implements IBadgeService {
  constructor(
    @Inject('IPointRepository')
    private readonly pointRepository: IPointRepository,
    @Inject('IUserBadgeRepository')
    private readonly userBadgeRepository: IUserBadgeRepository,
    @Inject('IBadgeAdminRepository')
    private readonly badgeAdminRepository: IBadgeAdminRepository,
    @Inject('ITransaction')
    private readonly transaction: ITransaction,
  ) {}

  async buyBadge(req: ReqBuyBadgeAppDto): Promise<ResBuyBadgeAppDto> {
    try {
      await this.transaction.beginTransaction('SERIALIZABLE');

      const { userId, badgeType } = req;
      const price = await this.badgeAdminRepository.getBadgePrice(badgeType);
      const currentPoint = await this.pointRepository.calculateUserPoints(
        userId,
      );
      if (currentPoint - price < 0) throw new ConflictException('포인트 부족');

      await this.pointRepository.createPointLog(
        userId,
        'SPENT',
        `${badgeType} 구매`,
        -price,
      );
      await this.userBadgeRepository.createUserBadgeLog(userId, badgeType);

      await this.transaction.commitTransaction();
      return { message: '뱃지 구매 성공' };
    } catch (error) {
      await this.transaction.rollbackTransaction();
      throw error;
    }
  }
}
