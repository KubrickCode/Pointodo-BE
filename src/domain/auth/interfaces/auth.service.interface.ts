import { UserEntity } from '@domain/user/entities/user.entity';
import { ResLogoutDto } from 'src/interface/dto/auth/logout.dto';
import { ResCheckPasswordDto } from 'src/interface/dto/auth/checkPassword.dto';
import { ResLoginDto } from 'src/interface/dto/auth/login.dto';
import { ReqSocialLoginDto } from 'src/interface/dto/auth/socialLogin.dto';

export interface IAuthService {
  validateUser(email: string, password: string): Promise<UserEntity>;
  checkPassword(id: string, password: string): Promise<ResCheckPasswordDto>;
  login(user: UserEntity): Promise<ResLoginDto>;
  logout(user: UserEntity): Promise<ResLogoutDto>;
  refresh(token: string): Promise<string>;
  socialLogin(socialUser: ReqSocialLoginDto): Promise<ResLoginDto>;
}
