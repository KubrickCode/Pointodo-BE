import { CREATE_TASK_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';

export const createTaskDocs = {
  operation: {
    summary: '작업 로그 생성',
    description: `작업 로그 생성\n
    taskType, name, description, importance, dueDate를 body로 전달받아서 작업 로그를 생성 후 Header의 Location에 작업ID 반환.
  `,
  },
  createdResponse: {
    description: CREATE_TASK_SUCCESS_MESSAGE,
  },
};
