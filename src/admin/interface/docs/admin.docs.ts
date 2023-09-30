import { ResForbiddenAdmin } from '@admin/interface/dto/admin.dto';
import { AuthErrorMessage } from '@shared/messages/auth/auth.errors';

export const adminDocs = {
  forbidden: {
    type: ResForbiddenAdmin,
    description: AuthErrorMessage.AUTH_INVALID_ADMIN,
  },
};
