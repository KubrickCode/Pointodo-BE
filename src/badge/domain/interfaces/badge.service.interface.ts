import { BadgeEntity } from '@admin/badge/domain/entities/badge.entity';
import { ReqBuyBadgeAppDto, ResBuyBadgeAppDto } from '../dto/buyBadge.app.dto';
import {
  ReqChangeSelectedBadgeAppDto,
  ResChangeSelectedBadgeAppDto,
} from '../dto/changeSelectedBadge.app.dto';
import {
  ReqGetAllBadgeProgressAppDto,
  ResGetAllBadgeProgressAppDto,
} from '../dto/getAllBadgeProgress.app.dto';
import {
  ReqGetUserBadgeListAppDto,
  ResGetUserBadgeListAppDto,
} from '../dto/getUserBadgeList.app.dto';

export interface IBadgeService {
  buyBadge(req: ReqBuyBadgeAppDto): Promise<ResBuyBadgeAppDto>;
  getUserBadgeList(
    req: ReqGetUserBadgeListAppDto,
  ): Promise<ResGetUserBadgeListAppDto[]>;
  changeSelectedBadge(
    req: ReqChangeSelectedBadgeAppDto,
  ): Promise<ResChangeSelectedBadgeAppDto>;
  getAllBadgeProgress(
    req: ReqGetAllBadgeProgressAppDto,
  ): Promise<ResGetAllBadgeProgressAppDto[]>;
  getAllBadges(): Promise<BadgeEntity[]>;
}
