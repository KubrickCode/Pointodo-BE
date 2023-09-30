import { BadgeMessage } from '@shared/messages/badge/badge.messages';

export const putBadgeToUserDocs = {
  operation: {
    summary: '유저에게 뱃지 부여',
    description: `어드민 권한\n
    userId와 badgeId를 query로 전달받아 유저에게 해당 뱃지 부여.
  `,
  },
  noContentResponse: {
    description: BadgeMessage.PUT_BADGE_SUCCESS_MESSAGE,
  },
};
