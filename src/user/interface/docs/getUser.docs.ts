import { ResGetUserDto } from '../dto/getUser.dto';

export const getUserDocs = {
  operation: {
    summary: '유저 정보 요청',
    description: `유저 정보 요청\n
  ID, 이메일, 공급업체, 권한, 뱃지ID, 가입날짜 가 제공됩니다.
  `,
  },
  okResponse: { type: ResGetUserDto, description: '유저 정보 요청 성공' },
};
