import { BadgeMessage } from '@shared/messages/badge/Badge.messages';

export const deleteUserBadgeDocs = {
  operation: {
    summary: '유저 뱃지 삭제',
    description: `어드민 권한\n
    userId와 badgeId를 query로 전달받아 해당 유저의 뱃지 보유 목록에서 해당 뱃지 삭제.
  `,
  },
  noContentResponse: {
    description: BadgeMessage.DELETE_USER_BADGE_SUCCESS_MESSAGE,
  },
};
