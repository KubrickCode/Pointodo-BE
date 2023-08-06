import { CREATE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { ResCreateTaskDto } from '../dto/createTask.dto';

export const createTaskDocs = {
  operation: {
    summary: '작업 로그 생성',
    description: `작업 로그 생성\n
    taskType, name, description, importance를 body로 전달받아서 작업 로그를 생성하고, 성공 메시지를 반환합니다.
  `,
  },
  okResponse: {
    type: ResCreateTaskDto,
    description: CREATE_TASK_SUCCESS_MESSAGE,
  },
};
