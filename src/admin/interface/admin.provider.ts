import { BadgeAdminService } from '@admin/badge/app/badge.admin.service';
import { IBADGE_ADMIN_SERVICE } from '@shared/constants/provider.constant';

export const AdminProvider = [
  {
    provide: IBADGE_ADMIN_SERVICE,
    useClass: BadgeAdminService,
  },
];
