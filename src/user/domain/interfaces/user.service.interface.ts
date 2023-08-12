import { ReqGetUserAppDto, ResGetUserAppDto } from '../dto/getUser.app.dto';
import { ReqRegisterAppDto, ResRegisterAppDto } from '../dto/register.app.dto';
import {
  ReqChangePasswordAppDto,
  ResChangePasswordAppDto,
} from '../dto/changePassword.app.dto';
import {
  ReqDeleteUserAppDto,
  ResDeleteUserAppDto,
} from '../dto/deleteUser.app.dto';
import {
  ReqGetUserListAppDto,
  ResGetUserListAppDto,
} from '../dto/getUserList.app.dto';
import {
  ReqGetTotalUserListPagesAppDto,
  ResGetTotalUserListPagesAppDto,
} from '../dto/getTotalUserListPages.app.dto';

export interface IUserService {
  register(user: ReqRegisterAppDto): Promise<ResRegisterAppDto>;

  getUser(req: ReqGetUserAppDto): Promise<ResGetUserAppDto>;

  changePassword(
    req: ReqChangePasswordAppDto,
  ): Promise<ResChangePasswordAppDto>;

  deleteUser(req: ReqDeleteUserAppDto): Promise<ResDeleteUserAppDto>;

  getUserList(req: ReqGetUserListAppDto): Promise<ResGetUserListAppDto[]>;

  getTotalUserListPages(
    req: ReqGetTotalUserListPagesAppDto,
  ): Promise<ResGetTotalUserListPagesAppDto>;
}
