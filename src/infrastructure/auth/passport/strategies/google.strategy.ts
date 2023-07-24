import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { IAuthService } from '@domain/auth/interfaces/auth.service.interface';
import { googleConfig } from '@shared/config/google.config';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import { ReqSocialLoginAppDto } from '@domain/auth/dto/app/socialLogin.app.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: googleConfig(configService).googleId,
      clientSecret: googleConfig(configService).googleSecret,
      callbackURL: googleConfig(configService).googleCallback,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const socialUser: ReqSocialLoginAppDto = {
      email: profile.emails[0].value,
      provider: 'Google',
    };
    const token = await this.authService.socialLogin(socialUser);
    done(null, token);
  }
}
