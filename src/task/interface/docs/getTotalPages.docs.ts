import { ResGetTotalPagesDto } from '../dto/getTotalPages.dto';

export const getTotalPagesDocs = {
  operation: {
    summary: '작업 총 페이지 수 요청',
    description: `작업 총 페이지 수\n
    taskType을 params로 받아서, 해당 타입에 맞는 작업의 총 페이지 수를 반환합니다.
  `,
  },
  okResponse: {
    type: ResGetTotalPagesDto,
    description: '작업 총 페이지 수',
  },
};
