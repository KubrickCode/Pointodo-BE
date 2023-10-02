import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/Badge.admin.repository';
import { BadgeService } from '@badge/app/Badge.service';
import { BadgeProgressRepository } from '@badge/infrastructure/prisma/BadgeProgress.repository';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/UserBadge.repository';
import { CacheService } from '@cache/infrastructure/Cache.service';
import { PointRepository } from '@point/infrastructure/prisma/Point.repository';
import { RedisService } from '@redis/infrastructure/Redis.service';
import { ProviderConstant } from '@shared/constants/Provider.constant';
import { PrismaService } from '@shared/service/Prisma.service';
import { TransactionService } from '@shared/service/Transaction.service';
import { HandleDateTime } from '@shared/utils/HandleDateTime';
import { UserRepository } from '@user/infrastructure/prisma/User.repository';

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
