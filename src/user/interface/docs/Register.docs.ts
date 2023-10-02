import { UserMessage } from '@shared/messages/user/User.messages';
import { ResRegisterExistUserError } from '../dto/Register.dto';
import { UserErrorMessage } from '@shared/messages/user/User.errors';

export const registerDocs = {
  operation: {
    summary: '회원 가입',
    description: `로컬 유저 생성\n
  이메일과 패스워드를 전달받아 로컬 유저 생성
  `,
  },
  createdResponse: { description: UserMessage.REGISTER_SUCCESS_MESSAGE },
  existUser: {
    type: ResRegisterExistUserError,
    description: UserErrorMessage.USER_ALREADY_EXIST,
  },
};
