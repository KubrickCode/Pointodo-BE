import { ResForbiddenAdmin } from '@interface/dto/admin/admin.dto';

export const adminDocs = {
  forbidden: {
    type: ResForbiddenAdmin,
    description: '관리자 권한 없음',
  },
};
