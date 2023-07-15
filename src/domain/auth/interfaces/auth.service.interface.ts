import { UserEntity } from '@domain/user/entities/user.entity';
import { DomainResLoginDto } from '../dto/login.dto';
import { ResLogoutDto } from 'src/interface/dto/auth/logout.dto';
import { DomainReqSocialLoginDto } from '../dto/socialLogin.dto';

export interface IAuthService {
  login(user: UserEntity): Promise<DomainResLoginDto>;
  logout(user: UserEntity): Promise<ResLogoutDto>;
  refresh(token: string): Promise<string>;
  socialLogin(socialUser: DomainReqSocialLoginDto): Promise<DomainResLoginDto>;
}
