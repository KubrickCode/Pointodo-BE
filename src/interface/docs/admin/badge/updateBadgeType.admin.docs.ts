import { ResUpdateBadgeTypeDto } from '@interface/dto/admin/badge/updateBadgeType.dto';

export const updateBadgeTypeDocs = {
  operation: {
    summary: '뱃지 타입 업데이트',
    description: `어드민 권한\n
    id를 parameter로 전달받고, newId, name, description, icon 중 선택된 필드를 전달받아 뱃지 타입을 업데이트하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResUpdateBadgeTypeDto,
    description: '뱃지 타입 업데이트 성공',
  },
};
