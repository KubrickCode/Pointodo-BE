import { ResDeleteTaskTypeDto } from '@admin/interface/dto/task/deleteTaskType.dto';

export const deleteTaskTypeDocs = {
  operation: {
    summary: '작업 타입 삭제',
    description: `어드민 권한\n
    id를 parameter로 전달받아 작업 타입을 삭제하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResDeleteTaskTypeDto,
    description: '작업 타입 삭제 성공',
  },
};
