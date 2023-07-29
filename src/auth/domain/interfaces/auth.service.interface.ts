import {
  ReqValidateUserAppDto,
  ResValidateUserAppDto,
} from '../dto/vaildateUser.app.dto';
import {
  ReqCheckPasswordAppDto,
  ResCheckPasswordAppDto,
} from '../dto/checkPassword.app.dto';
import { ReqLoginAppDto, ResLoginAppDto } from '../dto/login.app.dto';
import { ReqLogoutAppDto, ResLogoutAppDto } from '../dto/logout.app.dto';
import { ReqRefreshAppDto, ResRefreshAppDto } from '../dto/refresh.app.dto';
import { ReqSocialLoginAppDto } from '../dto/socialLogin.app.dto';
import {
  ReqValidateAdminAppDto,
  ResValidateAdminAppDto,
} from '../dto/validateAdmin.app.dto';

export interface IAuthService {
  validateUser(req: ReqValidateUserAppDto): Promise<ResValidateUserAppDto>;
  checkPassword(req: ReqCheckPasswordAppDto): Promise<ResCheckPasswordAppDto>;
  login(req: ReqLoginAppDto): Promise<ResLoginAppDto>;
  logout(req: ReqLogoutAppDto): Promise<ResLogoutAppDto>;
  refresh(req: ReqRefreshAppDto): Promise<ResRefreshAppDto>;
  socialLogin(socialUser: ReqSocialLoginAppDto): Promise<ResLoginAppDto>;
  validateAdmin(req: ReqValidateAdminAppDto): Promise<ResValidateAdminAppDto>;
}