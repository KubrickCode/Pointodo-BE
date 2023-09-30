import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/badge.admin.repository';
import { BadgeService } from '@badge/app/badge.service';
import { BadgeProgressRepository } from '@badge/infrastructure/prisma/badgeProgress.repository';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
import { CacheService } from '@cache/infrastructure/cache.service';
import { PointRepository } from '@point/infrastructure/prisma/point.repository';
import { RedisService } from '@redis/infrastructure/redis.service';
import { ProviderConstant } from '@shared/constants/provider.constant';
import { PrismaService } from '@shared/service/prisma.service';
import { TransactionService } from '@shared/service/transaction.service';
import { HandleDateTime } from '@shared/utils/handleDateTime';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

export const BadgeProvider = [
  PrismaService,
  {
    provide: ProviderConstant.IBADGE_SERVICE,
    useClass: BadgeService,
  },
  {
    provide: ProviderConstant.IPOINT_REPOSITORY,
    useClass: PointRepository,
  },
  {
    provide: ProviderConstant.IUSER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: ProviderConstant.IUSER_BADGE_REPOSITORY,
    useClass: UserBadgeRepository,
  },
  {
    provide: ProviderConstant.IBADGE_ADMIN_REPOSITORY,
    useClass: BadgeAdminRepository,
  },
  {
    provide: ProviderConstant.IBADGE_PROGRESS_REPOSITORY,
    useClass: BadgeProgressRepository,
  },
  {
    provide: ProviderConstant.ICACHE_SERVICE,
    useClass: CacheService,
  },
  {
    provide: ProviderConstant.IREDIS_SERVICE,
    useClass: RedisService,
  },
  {
    provide: ProviderConstant.IHANDLE_DATE_TIME,
    useClass: HandleDateTime,
  },
  {
    provide: ProviderConstant.ITRANSACTION_SERVICE,
    useClass: TransactionService,
  },
];
