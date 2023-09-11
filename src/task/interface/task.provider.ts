import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/badge.admin.repository';
import { BadgeProgressRepository } from '@badge/infrastructure/prisma/badgeProgress.repository';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
import { CacheService } from '@cache/infrastructure/cache.service';
import { PointRepository } from '@point/infrastructure/prisma/point.repository';
import { RedisService } from '@redis/infrastructure/redis.service';
import {
  IBADGE_ADMIN_REPOSITORY,
  IBADGE_PROGRESS_REPOSITORY,
  ICACHE_SERVICE,
  IHANDLE_DATE_TIME,
  IPOINT_REPOSITORY,
  IREDIS_SERVICE,
  ITASK_REPOSITORY,
  ITASK_SERVICE,
  ITRANSACTION_SERVICE,
  IUSER_BADGE_REPOSITORY,
  IUSER_REPOSITORY,
} from '@shared/constants/provider.constant';
import { PrismaService } from '@shared/service/prisma.service';
import { TransactionService } from '@shared/service/transaction.service';
import { HandleDateTime } from '@shared/utils/handleDateTime';
import { TaskService } from '@task/app/task.service';
import { TaskRepository } from '@task/infrastructure/prisma/task.repository';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

export const TaskProvider = [
  PrismaService,
  {
    provide: ITASK_SERVICE,
    useClass: TaskService,
  },
  {
    provide: ITASK_REPOSITORY,
    useClass: TaskRepository,
  },
  {
    provide: IBADGE_PROGRESS_REPOSITORY,
    useClass: BadgeProgressRepository,
  },
  {
    provide: IPOINT_REPOSITORY,
    useClass: PointRepository,
  },
  {
    provide: IUSER_BADGE_REPOSITORY,
    useClass: UserBadgeRepository,
  },
  {
    provide: ICACHE_SERVICE,
    useClass: CacheService,
  },
  {
    provide: IUSER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: IBADGE_ADMIN_REPOSITORY,
    useClass: BadgeAdminRepository,
  },
  {
    provide: IREDIS_SERVICE,
    useClass: RedisService,
  },
  {
    provide: IHANDLE_DATE_TIME,
    useClass: HandleDateTime,
  },
  {
    provide: ITRANSACTION_SERVICE,
    useClass: TransactionService,
  },
];
