import {
  ReqAdminCreateBadgeAppDto,
  ResAdminCreateBadgeAppDto,
} from '../dto/createBadge.admin.app.dto';
import { ReqAdminDeleteBadgeAppDto } from '../dto/deleteBadge.admin.app.dto';
import { ReqAdminUpdateBadgeAppDto } from '../dto/updateBadge.admin.app.dto';
import {
  ReqAdminUploadFileAppDto,
  ResAdminUploadFileAppDto,
} from '../dto/uploadFile.admin.app.dto';

export interface IBadgeAdminService {
  createBadge(
    req: ReqAdminCreateBadgeAppDto,
  ): Promise<ResAdminCreateBadgeAppDto>;

  updateBadge(req: ReqAdminUpdateBadgeAppDto): Promise<void>;

  deleteBadge(req: ReqAdminDeleteBadgeAppDto): Promise<void>;

  uploadFile(req: ReqAdminUploadFileAppDto): Promise<ResAdminUploadFileAppDto>;
}
