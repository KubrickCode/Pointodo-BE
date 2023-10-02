import { ResInvalidCheckPassword } from '@auth/interface/dto/CheckPassword.dto';
import { AuthErrorMessage } from '@shared/messages/auth/Auth.errors';
import { AuthMessage } from '@shared/messages/auth/Auth.messages';

export const checkPasswordDocs = {
  operation: {
    summary: '비밀번호 체크',
    description: `로컬 유저 비밀번호 체크\n
  비밀번호를 전달받아 현재 비밀번호와 일치하는지 확인
  `,
  },
  noContentResponse: {
    description: AuthMessage.CHECK_PASSWORD_MESSAGE,
  },
  invalidCheckPassword: {
    type: ResInvalidCheckPassword,
    description: AuthErrorMessage.AUTH_INVALID_PASSWORD,
  },
};
