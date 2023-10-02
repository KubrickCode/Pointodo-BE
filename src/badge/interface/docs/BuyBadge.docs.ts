import { BadgeMessage } from '@shared/messages/badge/Badge.messages';
import { ResBuyBadgeConflictError } from '../dto/BuyBadge.dto';
import { BadgeErrorMessage } from '@shared/messages/badge/Badge.errors';

export const buyBadgeDocs = {
  operation: {
    summary: '뱃지 구매',
    description: `뱃지 구매\n
  구매할 뱃지 ID를 param으로 전달받아 포인트를 소모하고 뱃지를 구입.
  `,
  },
  createdResponse: { description: BadgeMessage.BUY_BADGE_SUCCESS_MESSAGE },
  conflictError: {
    type: ResBuyBadgeConflictError,
    description: `다음 세가지 오류메시지 중 하나 반환\n
    ${BadgeErrorMessage.BUY_BADGE_LESS_POINTS} | ${BadgeErrorMessage.ALREADY_EXIST_USER_BADGE} | ${BadgeErrorMessage.BUY_BADGE_CONFLICT_POINTS}`,
  },
};
