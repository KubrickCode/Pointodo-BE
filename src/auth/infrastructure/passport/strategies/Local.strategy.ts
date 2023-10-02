import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IAuthService } from '@auth/domain/interfaces/Auth.service.interface';
import { ResValidateUserAppDto } from '@auth/domain/dto/VaildateUser.app.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<ResValidateUserAppDto> {
    return await this.authService.validateUser({
      email: email.toLowerCase(),
      password,
    });
  }
}
