import { ResAdminUpdateBadgeConflict } from '@admin/interface/dto/badge/UpdateBadge.admin.dto';
import { BadgeAdminMessage } from '@shared/messages/admin/Badge.admin.messages';

export const updateBadgeDocs = {
  operation: {
    summary: '뱃지 업데이트',
    description: `어드민 권한\n
    id를 parameter로 전달받고, name, description, iconLink, price 중 선택된 필드를 전달받아 뱃지를 업데이트.
  `,
  },
  noContentResponse: {
    description: BadgeAdminMessage.UPDATE_BADGE_SUCCESS_MESSAGE,
  },
  conflict: {
    type: ResAdminUpdateBadgeConflict,
    description: '뱃지 중복 에러',
  },
};
