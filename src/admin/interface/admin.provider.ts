import { BadgeAdminService } from '@admin/badge/app/badge.admin.service';
import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/badge.admin.repository';
import { CacheService } from '@cache/infrastructure/cache.service';
import { RedisService } from '@redis/infrastructure/redis.service';
import { ProviderConstant } from '@shared/constants/provider.constant';
import { PrismaService } from '@shared/service/prisma.service';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

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
