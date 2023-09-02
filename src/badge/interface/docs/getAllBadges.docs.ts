import { ResGetAllBadgesDto } from '../dto/getAllBadges.dto';

export const getAllBadgesDocs = {
  operation: {
    summary: '전체 뱃지 리스트',
    description: `전체 뱃지 리스트 반환\n
    전체 뱃지 리스트를 배열로 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetAllBadgesDto,
    description: '전체 뱃지 리스트 배열',
  },
};
