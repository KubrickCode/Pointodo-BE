import {
  ResCreateBadgeConflict,
  ResAdminCreateBadgeDto,
} from '@admin/interface/dto/badge/createBadge.admin.dto';

export const createBadgeDocs = {
  operation: {
    summary: '뱃지 생성',
    description: `어드민 권한\n
    id, name, description, iconLink, type, price(옵셔널) 필드를 전달받아 새 뱃지를 생성하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResAdminCreateBadgeDto,
    description: '뱃지 생성 성공',
  },
  conflict: {
    type: ResCreateBadgeConflict,
    description: '뱃지 중복 에러',
  },
};
