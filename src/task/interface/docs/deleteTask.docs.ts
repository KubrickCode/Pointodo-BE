import { DELETE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { ResDeleteTaskDto } from '../dto/deleteTask.dto';

export const deleteTaskDocs = {
  operation: {
    summary: '작업 로그 삭제',
    description: `작업 로그 삭제\n
    id와 taskType을 쿼리 스트링으로 전달받아서 작업 로그를 삭제하고, 성공 메시지를 반환합니다.
  `,
  },
  okResponse: {
    type: ResDeleteTaskDto,
    description: DELETE_TASK_SUCCESS_MESSAGE,
  },
};
