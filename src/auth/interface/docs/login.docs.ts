import {
  ResInvalidPassword,
  ResNotFoundUser,
  ResNotLocalUserLogin,
} from '@auth/interface/dto/login.dto';
import { AuthErrorMessage } from '@shared/messages/auth/auth.errors';
import { AuthMessage } from '@shared/messages/auth/auth.messages';
import { UserErrorMessage } from '@shared/messages/user/user.errors';

export const loginDocs = {
  operation: {
    summary: '로그인',
    description: `로컬 유저 로그인\n
    이메일과 패스워드를 전달받아 로컬 유저를 생성하고,\n
    액세스 토큰과 리프레시 토큰을 쿠키에 정의합니다.
    `,
  },
  okResponse: { description: AuthMessage.LOGIN_SUCCESS_MESSAGE },
  conflictError: {
    type: ResNotLocalUserLogin,
    description: UserErrorMessage.USER_EXIST_WITH_SOCIAL,
  },
  invalidEmail: {
    type: ResNotFoundUser,
    description: UserErrorMessage.USER_NOT_FOUND,
  },
  invalidPassword: {
    type: ResInvalidPassword,
    description: AuthErrorMessage.AUTH_INVALID_PASSWORD,
  },
};
