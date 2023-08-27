import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/badge.admin.repository';
import { BadgeProgressRepository } from '@badge/infrastructure/prisma/badgeProgress.repository';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
import { CacheService } from '@cache/infrastructure/cache.service';
import { PointRepository } from '@point/infrastructure/prisma/point.repository';
import { RedisService } from '@redis/infrastructure/redis.service';
import { PrismaService } from '@shared/service/prisma.service';
import { HandleDateTime } from '@shared/utils/handleDateTime';
import { TaskService } from '@task/app/task.service';
import { TaskRepository } from '@task/infrastructure/prisma/task.repository';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

export const TaskProvider = [
  PrismaService,
  {
    provide: 'ITaskService',
    useClass: TaskService,
  },
  {
    provide: 'ITaskRepository',
    useClass: TaskRepository,
  },
  {
    provide: 'IBadgeProgressRepository',
    useClass: BadgeProgressRepository,
  },
  {
    provide: 'IPointRepository',
    useClass: PointRepository,
  },
  {
    provide: 'IUserBadgeRepository',
    useClass: UserBadgeRepository,
  },
  {
    provide: 'ICacheService',
    useClass: CacheService,
  },
  {
    provide: 'IUserRepository',
    useClass: UserRepository,
  },
  {
    provide: 'IBadgeAdminRepository',
    useClass: BadgeAdminRepository,
  },
  {
    provide: 'IRedisService',
    useClass: RedisService,
  },
  {
    provide: 'IHandleDateTime',
    useClass: HandleDateTime,
  },
];
