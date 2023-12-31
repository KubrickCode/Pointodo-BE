import { ReqGetUserAppDto, ResGetUserAppDto } from '../dto/getUser.app.dto';
import { ReqRegisterAppDto } from '../dto/register.app.dto';
import { ReqUpdateUserAppDto } from '../dto/updateUser.app.dto';
import { ReqDeleteUserAppDto } from '../dto/deleteUser.app.dto';
import {
  ReqGetUserListAppDto,
  ResGetUserListAppDto,
} from '../dto/getUserList.app.dto';
import {
  ReqGetTotalUserListPagesAppDto,
  ResGetTotalUserListPagesAppDto,
} from '../dto/getTotalUserListPages.app.dto';
import {
  ReqGetTopUsersOnDateAppDto,
  ResGetTopUsersOnDateAppDto,
} from '../dto/getTopUsersOnDate.app.dto';

export interface IUserService {
  register(user: ReqRegisterAppDto): Promise<void>;

  getUser(req: ReqGetUserAppDto): Promise<ResGetUserAppDto>;

  updateUser(req: ReqUpdateUserAppDto): Promise<void>;

  deleteUser(req: ReqDeleteUserAppDto): Promise<void>;

  getUserList(req: ReqGetUserListAppDto): Promise<ResGetUserListAppDto[]>;

  getTotalUserListPages(
    req: ReqGetTotalUserListPagesAppDto,
  ): Promise<ResGetTotalUserListPagesAppDto>;

  getTopUsersOnDate(
    req: ReqGetTopUsersOnDateAppDto,
  ): Promise<ResGetTopUsersOnDateAppDto[]>;
}
