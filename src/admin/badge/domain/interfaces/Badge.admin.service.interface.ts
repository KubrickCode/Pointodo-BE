import {
  ReqAdminCreateBadgeAppDto,
  ResAdminCreateBadgeAppDto,
} from '../dto/CreateBadge.admin.app.dto';
import { ReqAdminDeleteBadgeAppDto } from '../dto/DeleteBadge.admin.app.dto';
import { ReqAdminUpdateBadgeAppDto } from '../dto/UpdateBadge.admin.app.dto';
import {
  ReqAdminUploadFileAppDto,
  ResAdminUploadFileAppDto,
} from '../dto/UploadFile.admin.app.dto';

export interface IBadgeAdminService {
  createBadge(
    req: ReqAdminCreateBadgeAppDto,
  ): Promise<ResAdminCreateBadgeAppDto>;

  updateBadge(req: ReqAdminUpdateBadgeAppDto): Promise<void>;

  deleteBadge(req: ReqAdminDeleteBadgeAppDto): Promise<void>;

  uploadFile(req: ReqAdminUploadFileAppDto): Promise<ResAdminUploadFileAppDto>;
}
