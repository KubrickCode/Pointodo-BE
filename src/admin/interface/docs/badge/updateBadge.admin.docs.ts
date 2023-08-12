import {
  ResUpdateBadgeConflict,
  ResUpdateBadgeDto,
} from '@admin/interface/dto/badge/updateBadge.dto';

export const updateBadgeDocs = {
  operation: {
    summary: '뱃지 업데이트',
    description: `어드민 권한\n
    id를 parameter로 전달받고, name, description, iconLink, price 중 선택된 필드를 전달받아 뱃지를 업데이트하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResUpdateBadgeDto,
    description: '뱃지 업데이트 성공',
  },
  conflict: {
    type: ResUpdateBadgeConflict,
    description: '뱃지 중복 에러',
  },
};
