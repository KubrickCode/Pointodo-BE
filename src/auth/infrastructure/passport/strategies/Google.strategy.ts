import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { IAuthService } from '@auth/domain/interfaces/Auth.service.interface';
import { googleConfig } from '@shared/config/Google.config';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import { ReqSocialLoginAppDto } from '@auth/domain/dto/SocialLogin.app.dto';

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
      provider: 'GOOGLE',
    };
    const { id } = await this.authService.socialLogin(socialUser);
    done(null, { id });
  }
}
