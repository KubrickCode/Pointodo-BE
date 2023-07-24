import { ResDeleteBadgeTypeDto } from '@interface/dto/admin/badge/deleteBadgeType.dto';

export const deleteBadgeTypeDocs = {
  operation: {
    summary: '뱃지 타입 삭제',
    description: `어드민 권한\n
    id를 parameter로 전달받아 뱃지 타입을 삭제하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResDeleteBadgeTypeDto,
    description: '뱃지 타입 삭제 성공',
  },
};
