import { ResDeletePointTransactionTypeDto } from '@interface/dto/admin/point/deletePointTransactionType.dto';

export const deletePointTransactionTypeDocs = {
  operation: {
    summary: '포인트 거래 타입 삭제',
    description: `어드민 권한\n
    id를 parameter로 전달받아 포인트 거래 타입을 삭제하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResDeletePointTransactionTypeDto,
    description: '포인트 거래 타입 삭제 성공',
  },
};
