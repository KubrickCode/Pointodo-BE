import { ResAdminGetBadgeListDto } from '@admin/interface/dto/badge/getBadgeList.admin.dto';

export const getBadgeListDocs = {
  operation: {
    summary: '뱃지 목록 요청',
    description: `어드민 권한\n
  type을 param으로 받아, 해당 타입의 모든 뱃지 객체를 배열 형태로 반환합니다.
  `,
  },
  okResponse: {
    type: ResAdminGetBadgeListDto,
    description: '뱃지 목록 요청 성공',
  },
};
