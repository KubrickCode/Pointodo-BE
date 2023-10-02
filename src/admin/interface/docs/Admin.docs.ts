import { ResForbiddenAdmin } from '@admin/interface/dto/Admin.dto';
import { AuthErrorMessage } from '@shared/messages/auth/Auth.errors';

export const adminDocs = {
  forbidden: {
    type: ResForbiddenAdmin,
    description: AuthErrorMessage.AUTH_INVALID_ADMIN,
  },
};
