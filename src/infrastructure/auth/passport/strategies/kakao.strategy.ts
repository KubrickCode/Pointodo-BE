import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-kakao';
import { AuthService } from '@domain/auth/auth.service';
import { Profile } from 'passport';
import { DomainReqSocialLoginDto } from '@domain/auth/dto/socialLogin.dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthService) {
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
    const socialUser: DomainReqSocialLoginDto = {
      email,
      provider: 'Kakao',
    };
    const token = await this.authService.socialLogin(socialUser);
    done(null, token);
  }
}
