import { ResGetAllBadgesDto } from '@admin/interface/dto/badge/getAllBadges.dto';

export const getAllBadgesDocs = {
  operation: {
    summary: '모든 뱃지 요청',
    description: `어드민 권한\n
  등록된 모든 뱃지 객체를 배열 형태로 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetAllBadgesDto,
    description: '모든 뱃지 요청 성공',
  },
};
