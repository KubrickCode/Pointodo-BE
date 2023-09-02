import { UPDATE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { COMPLETE_TASK_CONFLICT } from '@shared/messages/task/task.errors';

export const updateTaskDocs = {
  operation: {
    summary: '작업 로그 업데이트',
    description: `작업 로그 업데이트\n
    id를 param으로 받고, name, description, importance, dueDate를 body로 전달받아서 작업 로그를 업데이트.
  `,
  },
  noContentResponse: {
    description: UPDATE_TASK_SUCCESS_MESSAGE,
  },
  conflictResponse: {
    description: COMPLETE_TASK_CONFLICT,
  },
};
