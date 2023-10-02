import { ResGetAllBadgeProgressDto } from '../dto/GetAllBadgeProgress.dto';

export const getAllBadgeProgressDocs = {
  operation: {
    summary: '유저 뱃지 획득 진척도 리스트',
    description: `유저 뱃지 획득 진척도 리스트 반환\n
    유저 뱃지 획득 진척도 리스트를 badgeId와 progress 속성 필드로 이루어진 배열로 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetAllBadgeProgressDto,
    description: '유저 뱃지 획득 진척도 리스트 배열',
  },
};
