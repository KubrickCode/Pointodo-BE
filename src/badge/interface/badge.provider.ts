import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/badge.admin.repository';
import { BadgeService } from '@badge/app/badge.service';
import { BadgeProgressRepository } from '@badge/infrastructure/prisma/badgeProgress.repository';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
import { UserBadgeTransactionRepository } from '@badge/infrastructure/prisma/userBadge.tx.repository';
import { CacheService } from '@cache/infrastructure/cache.service';
import { PointRepository } from '@point/infrastructure/prisma/point.repository';
import { RedisService } from '@redis/infrastructure/redis.service';
import {
  IBADGE_ADMIN_REPOSITORY,
  IBADGE_PROGRESS_REPOSITORY,
  IBADGE_SERVICE,
  ICACHE_SERVICE,
  IHANDLE_DATE_TIME,
  IPOINT_REPOSITORY,
  IREDIS_SERVICE,
  IUSER_BADGE_REPOSITORY,
  IUSER_BADGE_TRANSACTION_REPOSITORY,
  IUSER_REPOSITORY,
} from '@shared/constants/provider.constant';
import { PrismaService } from '@shared/service/prisma.service';
import { HandleDateTime } from '@shared/utils/handleDateTime';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

export const BadgeProvider = [
  PrismaService,
  {
    provide: IBADGE_SERVICE,
    useClass: BadgeService,
  },
  {
    provide: IPOINT_REPOSITORY,
    useClass: PointRepository,
  },
  {
    provide: IUSER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: IUSER_BADGE_REPOSITORY,
    useClass: UserBadgeRepository,
  },
  {
    provide: IUSER_BADGE_TRANSACTION_REPOSITORY,
    useClass: UserBadgeTransactionRepository,
  },
  {
    provide: IBADGE_ADMIN_REPOSITORY,
    useClass: BadgeAdminRepository,
  },
  {
    provide: IBADGE_PROGRESS_REPOSITORY,
    useClass: BadgeProgressRepository,
  },
  {
    provide: ICACHE_SERVICE,
    useClass: CacheService,
  },
  {
    provide: IREDIS_SERVICE,
    useClass: RedisService,
  },
  {
    provide: IHANDLE_DATE_TIME,
    useClass: HandleDateTime,
  },
];
