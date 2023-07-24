import {
  ResInvalidPassword,
  ResLoginDto,
  ResNotFoundUser,
} from '@interface/dto/auth/login.dto';

export const loginDocs = {
  operation: {
    summary: '로그인',
    description: `로컬 유저 로그인\n
    이메일과 패스워드를 전달받아 로컬 유저를 생성하고,\n
    리프레시 토큰을 쿠키에 정의하고, 액세스 토큰을 제공합니다.
    `,
  },
  okResponse: { type: ResLoginDto, description: '로그인 성공' },
  invalidEmail: {
    type: ResNotFoundUser,
    description: '존재하지 않는 계정 에러',
  },
  invalidPassword: {
    type: ResInvalidPassword,
    description: '비밀번호 불일치 에러',
  },
};
