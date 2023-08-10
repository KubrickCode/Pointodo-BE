import {
  ReqCreateBadgeAppDto,
  ResCreateBadgeAppDto,
} from '../dto/createBadge.app.dto';
import {
  ReqDeleteBadgeAppDto,
  ResDeleteBadgeAppDto,
} from '../dto/deleteBadge.app.dto';
import { ReqGetBadgeListAppDto } from '../dto/getBadgeList.app.dto';
import {
  ReqUpdateBadgeAppDto,
  ResUpdateBadgeAppDto,
} from '../dto/updateBadge.app.dto';
import { BadgeEntity } from '../entities/badge.entity';

export interface IBadgeAdminService {
  getBadgeList(req: ReqGetBadgeListAppDto): Promise<BadgeEntity[]>;
  createBadge(req: ReqCreateBadgeAppDto): Promise<ResCreateBadgeAppDto>;
  updateBadge(req: ReqUpdateBadgeAppDto): Promise<ResUpdateBadgeAppDto>;
  deleteBadge(req: ReqDeleteBadgeAppDto): Promise<ResDeleteBadgeAppDto>;
}
