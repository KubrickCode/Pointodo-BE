import { ResAdminGetTotalUserListPagesDto } from '@admin/interface/dto/user/getTotalUserListPages.admin.dto';
import { UserConstant } from '@shared/constants/user.constant';

export const getTotalUserListPagesDocs = {
  operation: {
    summary: '유저 목록 페이지 수 요청',
    description: `어드민 권한\n
    provider, limit을 query로 전달받아 유저 목록의 페이지 수 반환.
  `,
  },
  okResponse: {
    type: ResAdminGetTotalUserListPagesDto,
    description: UserConstant.USER_LIST_PAGE,
  },
};
