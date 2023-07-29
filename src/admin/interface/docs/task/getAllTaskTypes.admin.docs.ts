import { ResGetAllTaskTypesDto } from '@admin/interface/dto/task/getAllTaskTypes.dto';

export const getAllTaskTypesDocs = {
  operation: {
    summary: '모든 작업 타입 요청',
    description: `어드민 권한\n
  등록된 모든 작업 타입 객체를 배열 형태로 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetAllTaskTypesDto,
    description: '모든 작업 타입 요청 성공',
  },
};
