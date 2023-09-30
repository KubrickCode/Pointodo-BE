import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/badge.admin.repository';
import { BadgeProgressRepository } from '@badge/infrastructure/prisma/badgeProgress.repository';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
import { CacheService } from '@cache/infrastructure/cache.service';
import { PointRepository } from '@point/infrastructure/prisma/point.repository';
import { RedisService } from '@redis/infrastructure/redis.service';
import { ProviderConstant } from '@shared/constants/provider.constant';
import { PrismaService } from '@shared/service/prisma.service';
import { TransactionService } from '@shared/service/transaction.service';
import { HandleDateTime } from '@shared/utils/handleDateTime';
import { TaskService } from '@task/app/task.service';
import { TaskRepository } from '@task/infrastructure/prisma/task.repository';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

export const TaskProvider = [
  PrismaService,
  {
    provide: ProviderConstant.ITASK_SERVICE,
    useClass: TaskService,
  },
  {
    provide: ProviderConstant.ITASK_REPOSITORY,
    useClass: TaskRepository,
  },
  {
    provide: ProviderConstant.IBADGE_PROGRESS_REPOSITORY,
    useClass: BadgeProgressRepository,
  },
  {
    provide: ProviderConstant.IPOINT_REPOSITORY,
    useClass: PointRepository,
  },
  {
    provide: ProviderConstant.IUSER_BADGE_REPOSITORY,
    useClass: UserBadgeRepository,
  },
  {
    provide: ProviderConstant.ICACHE_SERVICE,
    useClass: CacheService,
  },
  {
    provide: ProviderConstant.IUSER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: ProviderConstant.IBADGE_ADMIN_REPOSITORY,
    useClass: BadgeAdminRepository,
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
