import { ResGetPointsLogsDto } from '../dto/getPointsLogs.dto';

export const getPointsLogsDocs = {
  operation: {
    summary: '적립/소모 포인트 로그 요청',
    description: `적립/소모 포인트 로그 반환\n
    transactionType과 order와 offset과 limit을 query로 받아서 적립/소모 포인트 로그 객체로 이루어진 배열로 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetPointsLogsDto,
    description: '포인트 로그 배열',
  },
};
