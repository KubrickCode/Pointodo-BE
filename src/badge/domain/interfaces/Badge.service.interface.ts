import { BadgeEntity } from '@admin/badge/domain/entities/Badge.entity';
import { ReqBuyBadgeAppDto } from '../dto/BuyBadge.app.dto';
import { ReqChangeSelectedBadgeAppDto } from '../dto/ChangeSelectedBadge.app.dto';
import {
  ReqGetAllBadgeProgressAppDto,
  ResGetAllBadgeProgressAppDto,
} from '../dto/GetAllBadgeProgress.app.dto';
import {
  ReqGetUserBadgeListAppDto,
  ResGetUserBadgeListAppDto,
} from '../dto/GetUserBadgeList.app.dto';
import {
  ReqGetUserBadgeListWithNameAppDto,
  ResGetUserBadgeListWithNameAppDto,
} from '../dto/GetUserBadgeListWithName.app.dto';
import { ReqPutBadgeToUserAppDto } from '../dto/PutBadgeToUser.app.dto';
import { ReqDeleteUserBadgeAppDto } from '../dto/DeleteUserBadge.app.dto';

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
