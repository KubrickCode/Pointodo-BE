import {
  ResUpdatePointTransactionTypeConflict,
  ResUpdatePointTransactionTypeDto,
} from '@interface/dto/admin/point/updatePointTransactionType.dto';

export const updatePointTransactionTypeDocs = {
  operation: {
    summary: '포인트 거래 타입 업데이트',
    description: `어드민 권한\n
    id를 parameter로 전달받고, newId, name 중 선택된 필드를 전달받아 포인트 거래 타입을 업데이트하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResUpdatePointTransactionTypeDto,
    description: '포인트 거래 타입 업데이트 성공',
  },
  conflict: {
    type: ResUpdatePointTransactionTypeConflict,
    description: '포인트 거래 타입 중복 에러',
  },
};
