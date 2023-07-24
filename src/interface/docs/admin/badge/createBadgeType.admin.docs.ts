import {
  ResCreateBadgeTypeConflict,
  ResCreateBadgeTypeDto,
} from '@interface/dto/admin/badge/createBadgeType.dto';

export const createBadgeTypeDocs = {
  operation: {
    summary: '뱃지 타입 생성',
    description: `어드민 권한\n
    id, name, description, iconLink 필드를 전달받아 새 뱃지 타입을 생성하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResCreateBadgeTypeDto,
    description: '뱃지 타입 생성 성공',
  },
  conflict: {
    type: ResCreateBadgeTypeConflict,
    description: '뱃지 타입 중복 에러',
  },
};
