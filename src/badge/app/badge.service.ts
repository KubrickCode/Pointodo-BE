import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import {
  ReqBuyBadgeAppDto,
  ResBuyBadgeAppDto,
} from '@badge/domain/dto/buyBadge.app.dto';
import { IBadgeService } from '@badge/domain/interfaces/badge.service.interface';
import { IUserBadgeRepository } from '@badge/domain/interfaces/userBadge.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';

@Injectable()
export class BadgeService implements IBadgeService {
  constructor(
    @Inject('IPointRepository')
    private readonly pointRepository: IPointRepository,
    @Inject('IUserBadgeRepository')
    private readonly userBadgeRepository: IUserBadgeRepository,
    @Inject('IBadgeAdminRepository')
    private readonly badgeAdminRepository: IBadgeAdminRepository,
  ) {}

  async buyBadge(req: ReqBuyBadgeAppDto): Promise<ResBuyBadgeAppDto> {
    const { userId, badgeType } = req;
    const price = await this.badgeAdminRepository.getBadgePrice(badgeType);
    const currentPoint = await this.pointRepository.calculateUserPoints(userId);
    if (currentPoint - price < 0) throw new Error('포인트 부족');
    await this.pointRepository.createPointLog(
      userId,
      `${badgeType} 구매`,
      -price,
    );
    await this.userBadgeRepository.createUserBadgeLog(userId, badgeType);
    return { message: '뱃지 구매 성공' };
  }
}
