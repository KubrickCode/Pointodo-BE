import { ResGetAllPointsLogsDto } from '../dto/getAllPointsLogs.dto';

export const getAllPointsLogsDocs = {
  operation: {
    summary: '포인트 로그 요청',
    description: `모든 포인트 로그 반환\n
    포인트 로그 객체로 이루어진 배열로 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetAllPointsLogsDto,
    description: '포인트 로그 배열',
  },
};
