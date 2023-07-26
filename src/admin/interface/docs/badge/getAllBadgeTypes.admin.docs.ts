import { ResGetAllBadgeTypesDto } from '@admin/interface/dto/badge/getAllBadgeTypes.dto';

export const getAllBadgeTypesDocs = {
  operation: {
    summary: '모든 뱃지 타입 요청',
    description: `어드민 권한\n
  등록된 모든 뱃지 타입 객체를 배열 형태로 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetAllBadgeTypesDto,
    description: '모든 뱃지 타입 요청 성공',
  },
};
