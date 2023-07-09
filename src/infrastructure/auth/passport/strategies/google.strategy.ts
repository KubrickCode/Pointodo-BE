import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '@domain/auth/auth.service';
import { googleConfig } from 'config/google.config';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import { DomainReqSocialLoginDto } from '@domain/auth/dto/socialLogin.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
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
    const socialUser: DomainReqSocialLoginDto = {
      email: profile.emails[0].value,
      provider: 'Google',
    };
    const token = await this.authService.socialLogin(socialUser);
    done(null, token);
  }
}
