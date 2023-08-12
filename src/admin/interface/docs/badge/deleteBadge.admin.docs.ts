import { ResDeleteBadgeDto } from '@admin/interface/dto/badge/deleteBadge.dto';

export const deleteBadgeDocs = {
  operation: {
    summary: '뱃지 삭제',
    description: `어드민 권한\n
    id를 parameter로 전달받아 뱃지를 삭제하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResDeleteBadgeDto,
    description: '뱃지 삭제 성공',
  },
};
