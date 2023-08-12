import { CANCLE_TASK_COMPLETION_SUCCESS_MESSAGE } from '@shared/messages/task/task.message';
import { ResCancleTaskCompletionDto } from '../dto/cancleTaskCompletion.dto';

export const cancleTaskCompletionDocs = {
  operation: {
    summary: '완료 작업 취소',
    description: `왑료 작업 취소 업데이트\n
    id를 param으로 전달받아서 완료된 작업 로그를 취소 업데이트하고, 성공 메시지를 반환합니다.
  `,
  },
  okResponse: {
    type: ResCancleTaskCompletionDto,
    description: CANCLE_TASK_COMPLETION_SUCCESS_MESSAGE,
  },
};
