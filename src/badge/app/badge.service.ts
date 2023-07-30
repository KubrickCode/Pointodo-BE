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

  buyBadge(req: ReqBuyBadgeAppDto): Promise<ResBuyBadgeAppDto> {
    const { userId, badgeType } = req;
    return;
  }
}
