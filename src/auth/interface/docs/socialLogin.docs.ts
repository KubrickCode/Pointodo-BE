import { JWT_ACCESS_TOKEN } from '@shared/constants/user.constant';
import {
  RedirectSocialLoginDto,
  ResSocialLoginDto,
} from '../dto/socialLogin.dto';

export const socialLoginDocs = {
  google: {
    operation: {
      summary: '구글 로그인',
      description: `구글 로그인\n
    구글 로그인을 진행합니다.\n
    인증이 정상적으로 완료되었을 경우, 쿠키에 액세스 토큰과 리프레시 토큰을 정의하고,\n
    클라이언트의 /social-login 경로로 리디렉션 합니다.
    `,
    },
    okResponse: {
      type: RedirectSocialLoginDto,
      description: '구글 계정 인증 성공 및 소셜 로그인 리다이렉트',
    },
  },
  kakao: {
    operation: {
      summary: '카카오 로그인',
      description: `카카오 로그인\n
    카카오 로그인을 진행합니다.\n
    인증이 정상적으로 완료되었을 경우, 쿠키에 액세스 토큰과 리프레시 토큰을 정의하고,\n
    클라이언트의 /social-login 경로로 리디렉션 합니다.
    `,
    },
    okResponse: {
      type: RedirectSocialLoginDto,
      description: '카카오 계정 인증 성공 및 소셜 로그인 리다이렉트',
    },
  },
  socialLogin: {
    operation: {
      summary: '소셜 로그인',
      description: `소셜 로그인\n
    소셜 인증 이후, 소셜 로그인을 진행합니다.\n
    소셜 인증 후에 쿠키에 정의된 액세스 토큰을 삭제하고,\n
    해당 액세스 토큰을 클라이언트로 다시 반환합니다.
    `,
    },
    okResponse: {
      type: ResSocialLoginDto,
      description: JWT_ACCESS_TOKEN,
    },
  },
};
