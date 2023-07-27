import {
  ResCreatePointTransactionTypeConflict,
  ResCreatePointTransactionTypeDto,
} from '@interface/dto/admin/point/createPointTransactionType.dto';

export const createPointTransactionTypeDocs = {
  operation: {
    summary: '포인트 거래 타입 생성',
    description: `어드민 권한\n
    id, name 필드를 전달받아 새 포인트 거래 타입을 생성하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResCreatePointTransactionTypeDto,
    description: '포인트 거래 타입 생성 성공',
  },
  conflict: {
    type: ResCreatePointTransactionTypeConflict,
    description: '포인트 거래 타입 중복 에러',
  },
};
