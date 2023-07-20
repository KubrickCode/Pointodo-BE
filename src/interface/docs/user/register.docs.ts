import {
  ResRegisterDto,
  ResRegisterDtoError,
} from '../../dto/user/register.dto';

export const registerDocs = {
  operation: {
    summary: '회원 가입',
    description: `로컬 유저 생성\n
  이메일과 패스워드를 전달받아 로컬 유저를 생성하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: { type: ResRegisterDto, description: '회원가입 성공' },
  badRequest: {
    type: ResRegisterDtoError,
    description: '필드 유효성 검사 실패',
  },
};
