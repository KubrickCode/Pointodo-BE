import { BadgeMessage } from '@shared/messages/badge/badge.messages';

export const changeSelectedBadgeDocs = {
  operation: {
    summary: '유저 선택 뱃지 변경',
    description: `유저 선택 뱃지 변경\n
  변경할 뱃지 ID를 전달받아 선택 뱃지로 변경.
  `,
  },
  noContentResponse: {
    description: BadgeMessage.CHANGE_USER_BADGE_MESSAGE,
  },
};
