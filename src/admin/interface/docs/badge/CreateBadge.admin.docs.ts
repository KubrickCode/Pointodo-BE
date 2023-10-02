import { ResCreateBadgeConflict } from '@admin/interface/dto/badge/CreateBadge.admin.dto';
import { BadgeAdminMessage } from '@shared/messages/admin/Badge.admin.messages';

export const createBadgeDocs = {
  operation: {
    summary: '뱃지 생성',
    description: `어드민 권한\n
    name, description, iconLink, type, price(옵셔널) 필드를 전달받아 새 뱃지를 생성.
  `,
  },
  createdResponse: {
    description: BadgeAdminMessage.CREATE_BADGE_SUCCESS_MESSAGE,
  },
  conflict: {
    type: ResCreateBadgeConflict,
    description: '뱃지 중복 에러',
  },
};
