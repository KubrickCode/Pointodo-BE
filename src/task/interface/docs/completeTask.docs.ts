import { COMPLETE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import {
  ResCompleteTaskConflictError,
  ResCompleteTaskDto,
} from '../dto/completeTask.dto';
import { COMPLETE_TASK_CONFLICT } from '@shared/messages/task/task.errors';

export const completeTaskDocs = {
  operation: {
    summary: '작업 완료',
    description: `작업 로그 완료 업데이트\n
    id를 param으로 전달받아서 작업 로그를 완료 업데이트하고, 성공 메시지를 반환합니다.
  `,
  },
  okResponse: {
    type: ResCompleteTaskDto,
    description: COMPLETE_TASK_SUCCESS_MESSAGE,
  },
  conflictError: {
    type: ResCompleteTaskConflictError,
    description: COMPLETE_TASK_CONFLICT,
  },
};
