import {
  ReqCreateBadgeTypeAppDto,
  ResCreateBadgeTypeAppDto,
} from '../dto/createBadgeType.app.dto';
import { ResDeleteBadgeTypeAppDto } from '../dto/deleteBadgeType.app.dto';
import {
  ReqUpdateBadgeTypeAppDto,
  ResUpdateBadgeTypeAppDto,
} from '../dto/updateBadgeType.app.dto';
import { BadgeTypesEntity } from '../entities/badgeTypes.entity';

export interface IBadgeAdminService {
  getAllBadgeTypes(): Promise<BadgeTypesEntity[]>;
  createBadgeType(
    req: ReqCreateBadgeTypeAppDto,
  ): Promise<ResCreateBadgeTypeAppDto>;
  updateBadgeType(
    req: ReqUpdateBadgeTypeAppDto,
  ): Promise<ResUpdateBadgeTypeAppDto>;
  deleteBadgeType(id: number): Promise<ResDeleteBadgeTypeAppDto>;
}
