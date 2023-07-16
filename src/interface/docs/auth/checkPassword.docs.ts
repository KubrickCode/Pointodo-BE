import { ResCheckPasswordDto } from 'src/interface/dto/auth/checkPassword.dto';
import { ResTokenUnauthorized } from 'src/interface/dto/auth/tokenError.dto';
import { ResChangePasswordDtoError } from 'src/interface/dto/user/changePassword.dto';

export const checkPasswordDocs = {
  operation: {
    summary: '비밀번호 체크',
    description: `로컬 유저 비밀번호 체크\n
  비밀번호를 전달받아 현재 비밀번호와 일치하는지 확인 후, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: { type: ResCheckPasswordDto, description: '비밀번호 검증 성공' },
  badRequest: {
    type: ResChangePasswordDtoError,
    description: '필드 유효성 검사 실패',
  },
  unauthorizedResponse: {
    type: ResTokenUnauthorized,
    description: '토큰 인증 실패',
  },
};
