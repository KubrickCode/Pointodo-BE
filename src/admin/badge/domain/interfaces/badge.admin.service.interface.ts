import {
  ReqAdminCreateBadgeAppDto,
  ResAdminCreateBadgeAppDto,
} from '../dto/createBadge.admin.app.dto';
import { ReqAdminDeleteBadgeAppDto } from '../dto/deleteBadge.admin.app.dto';
import { ReqAdminGetBadgeListAppDto } from '../dto/getBadgeList.admin.app.dto';
import { ReqAdminUpdateBadgeAppDto } from '../dto/updateBadge.admin.app.dto';
import { BadgeEntity } from '../entities/badge.entity';

export interface IBadgeAdminService {
  getBadgeList(req: ReqAdminGetBadgeListAppDto): Promise<BadgeEntity[]>;

  createBadge(
    req: ReqAdminCreateBadgeAppDto,
  ): Promise<ResAdminCreateBadgeAppDto>;

  updateBadge(req: ReqAdminUpdateBadgeAppDto): Promise<void>;

  deleteBadge(req: ReqAdminDeleteBadgeAppDto): Promise<void>;

  uploadFile(file: Express.Multer.File): Promise<{ filePath: string }>;
}
