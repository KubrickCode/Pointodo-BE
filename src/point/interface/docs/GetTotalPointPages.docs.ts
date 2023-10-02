import { ResGetTotalPointPagesDto } from '../dto/GetTotalPointPages.dto';

export const getTotalPointPagesDocs = {
  operation: {
    summary: '포인트 로그 총 페이지 수 요청',
    description: `포인트 로그 총 페이지 수\n
    transactionType과 limit을 query로 받아서, 해당 타입에 맞는 포인트 로그의 총 페이지 수를 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetTotalPointPagesDto,
    description: '포인트 로그 총 페이지 수',
  },
};
