import {
  ReqValidateUserAppDto,
  ResValidateUserAppDto,
} from '../dto/app/vaildateUser.app.dto';
import {
  ReqCheckPasswordAppDto,
  ResCheckPasswordAppDto,
} from '../dto/app/checkPassword.app.dto';
import { ReqLoginAppDto, ResLoginAppDto } from '../dto/app/login.app.dto';
import { ReqLogoutAppDto, ResLogoutAppDto } from '../dto/app/logout.app.dto';
import { ReqRefreshAppDto, ResRefreshAppDto } from '../dto/app/refresh.app.dto';
import { ReqSocialLoginAppDto } from '../dto/app/socialLogin.app.dto';

export interface IAuthService {
  validateUser(req: ReqValidateUserAppDto): Promise<ResValidateUserAppDto>;
  checkPassword(req: ReqCheckPasswordAppDto): Promise<ResCheckPasswordAppDto>;
  login(req: ReqLoginAppDto): Promise<ResLoginAppDto>;
  logout(req: ReqLogoutAppDto): Promise<ResLogoutAppDto>;
  refresh(req: ReqRefreshAppDto): Promise<ResRefreshAppDto>;
  socialLogin(socialUser: ReqSocialLoginAppDto): Promise<ResLoginAppDto>;
}
