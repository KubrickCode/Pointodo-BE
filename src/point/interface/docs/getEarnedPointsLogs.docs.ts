import { ResGetEarnedPointsLogsDto } from '../dto/getEarnedPointsLogs.dto';

export const getEarnedPointsLogsDocs = {
  operation: {
    summary: '적립 포인트 로그 요청',
    description: `모든 적립 포인트 로그 반환\n
    order을 param으로 받아서 적립 포인트 로그 객체로 이루어진 배열로 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetEarnedPointsLogsDto,
    description: '포인트 로그 배열',
  },
};
