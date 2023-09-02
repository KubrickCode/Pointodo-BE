import { ResAdminGetUserBadgeListDto } from '@admin/interface/dto/user/getUserBadgeList.admin.dto';

export const getUserBadgeListDocs = {
  operation: {
    summary: '유저 뱃지 목록 요청',
    description: `어드민 권한\n
    user의 id를 param으로 전달받아 badgeId와 name 객체로 이루어진 뱃지 목록 배열 반환.
  `,
  },
  okResponse: {
    type: ResAdminGetUserBadgeListDto,
    description: '뱃지 목록 배열',
  },
};
