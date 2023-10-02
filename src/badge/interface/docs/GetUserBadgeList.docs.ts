import { ResGetUserBadgeListDto } from '../dto/GetUserBadgeList.dto';

export const getUserBadgeListDocs = {
  operation: {
    summary: '유저 보유 뱃지 리스트',
    description: `유저 보유 뱃지 리스트 반환\n
  유저의 보유 뱃지 리스트를 badgeId 속성 필드로 이루어진 배열로 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetUserBadgeListDto,
    description: '유저의 보유 뱃지 리스트 배열',
  },
};
