import { BadgeAdminService } from '@admin/badge/app/badge.admin.service';
import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/badge.admin.repository';
import { CacheService } from '@cache/infrastructure/cache.service';
import { RedisService } from '@redis/infrastructure/redis.service';
import {
  IBADGE_ADMIN_REPOSITORY,
  IBADGE_ADMIN_SERVICE,
  ICACHE_SERVICE,
  IREDIS_SERVICE,
  IUSER_REPOSITORY,
} from '@shared/constants/provider.constant';
import { PrismaService } from '@shared/service/prisma.service';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

export const AdminProvider = [
  PrismaService,
  {
    provide: IBADGE_ADMIN_SERVICE,
    useClass: BadgeAdminService,
  },
  {
    provide: IBADGE_ADMIN_REPOSITORY,
    useClass: BadgeAdminRepository,
  },
  {
    provide: IUSER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: IREDIS_SERVICE,
    useClass: RedisService,
  },
  {
    provide: ICACHE_SERVICE,
    useClass: CacheService,
  },
];
