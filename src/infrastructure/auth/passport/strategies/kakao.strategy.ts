import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-kakao';
import { IAuthService } from '@domain/auth/interfaces/auth.service.interface';
import { Profile } from 'passport';
import { ReqSocialLoginAppDto } from '@domain/auth/dto/app/socialLogin.app.dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {
    super({
      clientID: process.env.KAKAO_ID,
      callbackURL: process.env.KAKAO_CALLBACK,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const email = profile.id + '@kakao.com';
    const socialUser: ReqSocialLoginAppDto = {
      email,
      provider: 'KAKAO',
    };
    const token = await this.authService.socialLogin(socialUser);
    done(null, token);
  }
}
