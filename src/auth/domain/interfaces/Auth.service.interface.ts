import {
  ReqValidateUserAppDto,
  ResValidateUserAppDto,
} from '../dto/VaildateUser.app.dto';
import { ReqCheckPasswordAppDto } from '../dto/CheckPassword.app.dto';
import { ReqLoginAppDto, ResLoginAppDto } from '../dto/Login.app.dto';
import { ReqLogoutAppDto } from '../dto/Logout.app.dto';
import { ReqRefreshAppDto, ResRefreshAppDto } from '../dto/Refresh.app.dto';
import {
  ReqSocialLoginAppDto,
  ResSocialLoginAppDto,
} from '../dto/SocialLogin.app.dto';
import {
  ReqValidateAdminAppDto,
  ResValidateAdminAppDto,
} from '../dto/ValidateAdmin.app.dto';

export interface IAuthService {
  validateUser(req: ReqValidateUserAppDto): Promise<ResValidateUserAppDto>;

  checkPassword(req: ReqCheckPasswordAppDto): Promise<void>;

  login(req: ReqLoginAppDto): Promise<ResLoginAppDto>;

  logout(req: ReqLogoutAppDto): Promise<void>;

  refresh(req: ReqRefreshAppDto): Promise<ResRefreshAppDto>;

  socialLogin(socialUser: ReqSocialLoginAppDto): Promise<ResSocialLoginAppDto>;

  validateAdmin(req: ReqValidateAdminAppDto): Promise<ResValidateAdminAppDto>;
}
