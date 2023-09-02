import { DELETE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';

export const deleteTaskDocs = {
  operation: {
    summary: '작업 로그 삭제',
    description: `작업 로그 삭제\n
    id를 param으로 전달받아서 작업 로그를 삭제.
  `,
  },
  noContentResponse: {
    description: DELETE_TASK_SUCCESS_MESSAGE,
  },
};
