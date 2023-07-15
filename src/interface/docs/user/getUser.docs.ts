import { ResTokenUnauthorized } from 'src/interface/dto/auth/tokenError.dto';
import { ResGetUserDto } from '../../dto/user/getUser.dto';

export const getUserDocs = {
  operation: {
    summary: '유저 정보 요청',
    description: `유저 정보 요청\n
  ID, 이메일, 공급업체, 권한, 뱃지ID, 가입날짜 가 제공됩니다.
  `,
  },
  okResponse: { type: ResGetUserDto, description: '유저 정보 요청 성공' },
  unauthorizedResponse: {
    type: ResTokenUnauthorized,
    description: '토큰 인증 실패',
  },
};
