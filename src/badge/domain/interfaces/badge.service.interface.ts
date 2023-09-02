import { BadgeEntity } from '@admin/badge/domain/entities/badge.entity';
import { ReqBuyBadgeAppDto } from '../dto/buyBadge.app.dto';
import { ReqChangeSelectedBadgeAppDto } from '../dto/changeSelectedBadge.app.dto';
import {
  ReqGetAllBadgeProgressAppDto,
  ResGetAllBadgeProgressAppDto,
} from '../dto/getAllBadgeProgress.app.dto';
import {
  ReqGetUserBadgeListAppDto,
  ResGetUserBadgeListAppDto,
} from '../dto/getUserBadgeList.app.dto';
import {
  ReqGetUserBadgeListWithNameAppDto,
  ResGetUserBadgeListWithNameAppDto,
} from '../dto/getUserBadgeListWithName.app.dto';
import { ReqPutBadgeToUserAppDto } from '../dto/putBadgeToUser.app.dto';
import { ReqDeleteUserBadgeAppDto } from '../dto/deleteUserBadge.app.dto';

export interface IBadgeService {
  buyBadge(req: ReqBuyBadgeAppDto): Promise<void>;

  getUserBadgeList(
    req: ReqGetUserBadgeListAppDto,
  ): Promise<ResGetUserBadgeListAppDto[]>;

  getUserBadgeListWithName(
    req: ReqGetUserBadgeListWithNameAppDto,
  ): Promise<ResGetUserBadgeListWithNameAppDto[]>;

  changeSelectedBadge(req: ReqChangeSelectedBadgeAppDto): Promise<void>;

  getAllBadgeProgress(
    req: ReqGetAllBadgeProgressAppDto,
  ): Promise<ResGetAllBadgeProgressAppDto[]>;

  getAllBadges(): Promise<BadgeEntity[]>;

  putBadgeToUser(req: ReqPutBadgeToUserAppDto): Promise<void>;

  deleteUserBadge(req: ReqDeleteUserBadgeAppDto): Promise<void>;
}
