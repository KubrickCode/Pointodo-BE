import { UPDATE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { ResUpdateTaskDto } from '../dto/updateTask.dto';

export const updateTaskDocs = {
  operation: {
    summary: '작업 로그 업데이트',
    description: `작업 로그 업데이트\n
    id(필수), name, description, importance을 body로 전달받아서 작업 로그를 업데이트하고, 성공 메시지를 반환합니다.
  `,
  },
  okResponse: {
    type: ResUpdateTaskDto,
    description: UPDATE_TASK_SUCCESS_MESSAGE,
  },
};
