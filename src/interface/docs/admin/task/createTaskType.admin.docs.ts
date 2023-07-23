import {
  ResCreateTaskTypeConflict,
  ResCreateTaskTypeDto,
} from '@interface/dto/admin/task/createTaskType.dto';

export const createTaskTypeDocs = {
  operation: {
    summary: '작업 타입 생성',
    description: `어드민 권한\n
    id, name 필드를 전달받아 새 작업 타입을 생성하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResCreateTaskTypeDto,
    description: '작업 타입 생성 성공',
  },
  conflict: {
    type: ResCreateTaskTypeConflict,
    description: '작업 타입 중복 에러',
  },
};
