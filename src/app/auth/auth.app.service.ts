import { Injectable } from '@nestjs/common';
import { UserEntity } from '@domain/user/entities/user.entity';
import { AuthService } from '@domain/auth/auth.service';
import { ResLogoutDto } from './dto/logout.dto';
import { LOGOUT_SUCCESS_MESSAGE } from './messages/auth.messages';
import { DomainResLoginDto } from '@domain/auth/dto/login.dto';

@Injectable()
export class AuthAppService {
  constructor(private readonly authService: AuthService) {}

  async login(user: UserEntity): Promise<DomainResLoginDto> {
    return await this.authService.login(user);
  }

  async logout(user: UserEntity): Promise<ResLogoutDto> {
    await this.authService.logout(user);
    return { message: LOGOUT_SUCCESS_MESSAGE };
  }

  async refresh(token: string) {
    return await this.authService.refresh(token);
  }
}
