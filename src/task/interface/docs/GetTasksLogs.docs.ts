import { ResGetTasksLogsDto } from '../dto/GetTasksLogs.dto';

export const getTasksLogsDocs = {
  operation: {
    summary: '작업 목록 요청',
    description: `작업 목록 반환\n
    taskType과 offset과 limit과 order를 query로 받아서, 해당 타입에 맞는 작업 객체들을 배열로 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetTasksLogsDto,
    description: '작업 객체 배열',
  },
};
