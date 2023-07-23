import {
  ResUpdateTaskTypeConflict,
  ResUpdateTaskTypeDto,
} from '@interface/dto/admin/task/updateTaskType.dto';

export const updateTaskTypeDocs = {
  operation: {
    summary: '작업 타입 업데이트',
    description: `어드민 권한\n
    id를 parameter로 전달받고, newId, name 중 선택된 필드를 전달받아 작업 타입을 업데이트하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResUpdateTaskTypeDto,
    description: '작업 타입 업데이트 성공',
  },
  conflict: {
    type: ResUpdateTaskTypeConflict,
    description: '작업 타입 중복 에러',
  },
};
