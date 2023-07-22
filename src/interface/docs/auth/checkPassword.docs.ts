import {
  ResCheckPasswordDto,
  ResInvalidCheckPassword,
} from '@interface/dto/auth/checkPassword.dto';

export const checkPasswordDocs = {
  operation: {
    summary: '비밀번호 체크',
    description: `로컬 유저 비밀번호 체크\n
  비밀번호를 전달받아 현재 비밀번호와 일치하는지 확인 후, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: { type: ResCheckPasswordDto, description: '비밀번호 검증 성공' },
  invalidCheckPassword: {
    type: ResInvalidCheckPassword,
    description: '비밀번호 검증 실패',
  },
};
