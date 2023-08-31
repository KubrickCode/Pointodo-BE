import { ResForbiddenAdmin } from '@admin/interface/dto/admin.dto';
import { AUTH_INVALID_ADMIN } from '@shared/messages/auth/auth.errors';

export const adminDocs = {
  forbidden: {
    type: ResForbiddenAdmin,
    description: AUTH_INVALID_ADMIN,
  },
};
