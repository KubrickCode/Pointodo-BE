import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
import { CacheService } from '@cache/infrastructure/cache.service';
import { RedisService } from '@redis/infrastructure/redis.service';
import {
  ICACHE_SERVICE,
  IPASSWORD_HASHER,
  IREDIS_SERVICE,
  IUSER_BADGE_REPOSITORY,
  IUSER_REPOSITORY,
  IUSER_SERVICE,
} from '@shared/constants/provider.constant';
import { PrismaService } from '@shared/service/prisma.service';
import { PasswordHasher } from '@shared/utils/passwordHasher';
import { UserService } from '@user/app/user.service';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

export const UserProvider = [
  PrismaService,
  {
    provide: IUSER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: IUSER_SERVICE,
    useClass: UserService,
  },
  {
    provide: ICACHE_SERVICE,
    useClass: CacheService,
  },
  {
    provide: IUSER_BADGE_REPOSITORY,
    useClass: UserBadgeRepository,
  },
  {
    provide: IREDIS_SERVICE,
    useClass: RedisService,
  },
  {
    provide: IPASSWORD_HASHER,
    useClass: PasswordHasher,
  },
];
