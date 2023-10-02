import { ResAdminGetUserListDto } from '@admin/interface/dto/user/GetUserList.admin.dto';

export const getUserListDocs = {
  operation: {
    summary: '유저 목록 요청',
    description: `어드민 권한\n
    offset, limit, order, provider를 query로 전달받아 유저 목록을 배열로 반환.
  `,
  },
  okResponse: {
    type: ResAdminGetUserListDto,
    description: '유저 객체로 이루어진 배열',
  },
};
