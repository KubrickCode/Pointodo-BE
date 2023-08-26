import {
  ResInvalidPassword,
  ResLoginDto,
  ResNotFoundUser,
} from '@auth/interface/dto/login.dto';
import { AUTH_INVALID_PASSWORD } from '@shared/messages/auth/auth.errors';
import { LOGIN_SUCCESS_MESSAGE } from '@shared/messages/auth/auth.messages';
import { USER_NOT_FOUND } from '@shared/messages/user/user.errors';

export const loginDocs = {
  operation: {
    summary: '로그인',
    description: `로컬 유저 로그인\n
    이메일과 패스워드를 전달받아 로컬 유저를 생성하고,\n
    액세스 토큰과 리프레시 토큰을 쿠키에 정의합니다.
    `,
  },
  okResponse: { type: ResLoginDto, description: LOGIN_SUCCESS_MESSAGE },
  invalidEmail: {
    type: ResNotFoundUser,
    description: USER_NOT_FOUND,
  },
  invalidPassword: {
    type: ResInvalidPassword,
    description: AUTH_INVALID_PASSWORD,
  },
};
