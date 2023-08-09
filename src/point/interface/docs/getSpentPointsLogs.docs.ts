import { ResGetSpentPointsLogsDto } from '../dto/getSpentPointsLogs.dto';

export const getSpentPointsLogsDocs = {
  operation: {
    summary: '소모 포인트 로그 요청',
    description: `모든 소모 포인트 로그 반환\n
    소모 포인트 로그 객체로 이루어진 배열로 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetSpentPointsLogsDto,
    description: '포인트 로그 배열',
  },
};
