import { ResForbiddenAdmin } from '@admin/interface/dto/admin.dto';

export const adminDocs = {
  forbidden: {
    type: ResForbiddenAdmin,
    description: '관리자 권한 없음',
  },
};
