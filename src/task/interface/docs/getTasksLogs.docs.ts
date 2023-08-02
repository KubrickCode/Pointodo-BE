import { ResGetTasksLogsDto } from '../dto/getTasksLogs.dto';

export const getTasksLogsDocs = {
  operation: {
    summary: '작업 목록 요청',
    description: `작업 목록 반환\n
    taskType를 param으로 받아서, 해당 타입에 맞는 작업 객체들을 배열로 반환합니다.\n
    taskType을 param으로 작성할 때 "매일 작업"은 "daily", "기한 작업"은 "deadline", "무기한 작업"은 "free"를 param으로 전달합니다.
  `,
  },
  okResponse: {
    type: ResGetTasksLogsDto,
    description: '작업 객체 배열',
  },
};
