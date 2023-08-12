import { CHANGE_USER_BADGE_MESSAGE } from '@shared/messages/badge/badge.messages';
import { ResChangeSelectedBadgeDto } from '../dto/changeSelectedBadge.dto';

export const changeSelectedBadgeDocs = {
  operation: {
    summary: '유저 선택 뱃지 변경',
    description: `유저 선택 뱃지 변경\n
  변경할 뱃지 ID를 전달받아 선택 뱃지로 변경하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResChangeSelectedBadgeDto,
    description: CHANGE_USER_BADGE_MESSAGE,
  },
};
