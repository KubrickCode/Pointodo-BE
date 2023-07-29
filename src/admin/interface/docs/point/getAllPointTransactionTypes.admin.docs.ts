import { ResGetAllPointTransactionTypesDto } from '@admin/interface/dto/point/getAllPointTransactionTypes.dto';

export const getAllPointTransactionTypesDocs = {
  operation: {
    summary: '모든 포인트 거래 타입 요청',
    description: `어드민 권한\n
  등록된 모든 포인트 거래 타입 객체를 배열 형태로 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetAllPointTransactionTypesDto,
    description: '모든 포인트 거래 타입 요청 성공',
  },
};
