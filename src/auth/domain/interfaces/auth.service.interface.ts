import {
  ReqValidateUserAppDto,
  ResValidateUserAppDto,
} from '../dto/vaildateUser.app.dto';
import { ReqCheckPasswordAppDto } from '../dto/checkPassword.app.dto';
import { ReqLoginAppDto, ResLoginAppDto } from '../dto/login.app.dto';
import { ReqLogoutAppDto } from '../dto/logout.app.dto';
import { ReqRefreshAppDto, ResRefreshAppDto } from '../dto/refresh.app.dto';
import { ReqSocialLoginAppDto } from '../dto/socialLogin.app.dto';
import {
  ReqValidateAdminAppDto,
  ResValidateAdminAppDto,
} from '../dto/validateAdmin.app.dto';

export interface IAuthService {
  validateUser(req: ReqValidateUserAppDto): Promise<ResValidateUserAppDto>;

  checkPassword(req: ReqCheckPasswordAppDto): Promise<void>;

  login(req: ReqLoginAppDto): Promise<ResLoginAppDto>;

  logout(req: ReqLogoutAppDto): Promise<void>;

  refresh(req: ReqRefreshAppDto): Promise<ResRefreshAppDto>;

  socialLogin(socialUser: ReqSocialLoginAppDto): Promise<ResLoginAppDto>;

  validateAdmin(req: ReqValidateAdminAppDto): Promise<ResValidateAdminAppDto>;
}
