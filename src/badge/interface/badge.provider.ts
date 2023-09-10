import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/badge.admin.repository';
import { BadgeService } from '@badge/app/badge.service';
import { BadgeProgressRepository } from '@badge/infrastructure/prisma/badgeProgress.repository';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
import { UserBadgeTransactionRepository } from '@badge/infrastructure/prisma/userBadge.tx.repository';
import { CacheService } from '@cache/infrastructure/cache.service';
import { PointRepository } from '@point/infrastructure/prisma/point.repository';
import { RedisService } from '@redis/infrastructure/redis.service';
import { IUSER_BADGE_TRANSACTION_REPOSITORY } from '@shared/constants/provider.constant';
import { PrismaService } from '@shared/service/prisma.service';
import { HandleDateTime } from '@shared/utils/handleDateTime';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

export const BadgeProvider = [
  PrismaService,
  {
    provide: 'IBadgeService',
    useClass: BadgeService,
  },
  {
    provide: 'IPointRepository',
    useClass: PointRepository,
  },
  {
    provide: 'IUserRepository',
    useClass: UserRepository,
  },
  {
    provide: 'IUserBadgeRepository',
    useClass: UserBadgeRepository,
  },
  {
    provide: IUSER_BADGE_TRANSACTION_REPOSITORY,
    useClass: UserBadgeTransactionRepository,
  },
  {
    provide: 'IBadgeAdminRepository',
    useClass: BadgeAdminRepository,
  },
  {
    provide: 'IBadgeProgressRepository',
    useClass: BadgeProgressRepository,
  },
  {
    provide: 'ICacheService',
    useClass: CacheService,
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
