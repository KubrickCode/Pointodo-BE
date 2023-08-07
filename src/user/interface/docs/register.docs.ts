import { REGISTER_SUCCESS_MESSAGE } from '@shared/messages/user/user.messages';
import { ResRegisterDto, ResRegisterExistUserError } from '../dto/register.dto';
import { USER_ALREADY_EXIST } from '@shared/messages/user/user.errors';

export const registerDocs = {
  operation: {
    summary: '회원 가입',
    description: `로컬 유저 생성\n
  이메일과 패스워드를 전달받아 로컬 유저를 생성하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: { type: ResRegisterDto, description: REGISTER_SUCCESS_MESSAGE },
  existUser: {
    type: ResRegisterExistUserError,
    description: USER_ALREADY_EXIST,
  },
};
