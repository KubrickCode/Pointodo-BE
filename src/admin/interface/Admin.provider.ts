import { BadgeAdminService } from '@admin/badge/app/Badge.admin.service';
import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/Badge.admin.repository';
import { CacheService } from '@cache/infrastructure/Cache.service';
import { RedisService } from '@redis/infrastructure/Redis.service';
import { ProviderConstant } from '@shared/constants/Provider.constant';
import { PrismaService } from '@shared/service/Prisma.service';
import { UserRepository } from '@user/infrastructure/prisma/User.repository';

export const AdminProvider = [
  PrismaService,
  {
    provide: ProviderConstant.IBADGE_ADMIN_SERVICE,
    useClass: BadgeAdminService,
  },
  {
    provide: ProviderConstant.IBADGE_ADMIN_REPOSITORY,
    useClass: BadgeAdminRepository,
  },
  {
    provide: ProviderConstant.IUSER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: ProviderConstant.IREDIS_SERVICE,
    useClass: RedisService,
  },
  {
    provide: ProviderConstant.ICACHE_SERVICE,
    useClass: CacheService,
  },
];
