import { ReqGetUserAppDto, ResGetUserAppDto } from '../dto/app/getUser.app.dto';
import {
  ReqRegisterAppDto,
  ResRegisterAppDto,
} from '../dto/app/register.app.dto';
import {
  ReqChangePasswordAppDto,
  ResChangePasswordAppDto,
} from '../dto/app/changePassword.app.dto';
import {
  ReqDeleteUserAppDto,
  ResDeleteUserAppDto,
} from '../dto/app/deleteUser.app.dto';

export interface IUserService {
  registerUser(user: ReqRegisterAppDto): Promise<ResRegisterAppDto>;
  getUser(req: ReqGetUserAppDto): Promise<ResGetUserAppDto>;
  changePassword(
    req: ReqChangePasswordAppDto,
  ): Promise<ResChangePasswordAppDto>;
  deleteUser(req: ReqDeleteUserAppDto): Promise<ResDeleteUserAppDto>;
}
