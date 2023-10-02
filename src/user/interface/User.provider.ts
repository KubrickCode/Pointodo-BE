import { UserBadgeRepository } from '@badge/infrastructure/prisma/UserBadge.repository';
import { CacheService } from '@cache/infrastructure/Cache.service';
import { RedisService } from '@redis/infrastructure/Redis.service';
import { ProviderConstant } from '@shared/constants/Provider.constant';
import { PrismaService } from '@shared/service/Prisma.service';
import { PasswordHasher } from '@shared/utils/PasswordHasher';
import { UserService } from '@user/app/User.service';
import { UserRepository } from '@user/infrastructure/prisma/User.repository';

export const UserProvider = [
  PrismaService,
  {
    provide: ProviderConstant.IUSER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: ProviderConstant.IUSER_SERVICE,
    useClass: UserService,
  },
  {
    provide: ProviderConstant.ICACHE_SERVICE,
    useClass: CacheService,
  },
  {
    provide: ProviderConstant.IUSER_BADGE_REPOSITORY,
    useClass: UserBadgeRepository,
  },
  {
    provide: ProviderConstant.IREDIS_SERVICE,
    useClass: RedisService,
  },
  {
    provide: ProviderConstant.IPASSWORD_HASHER,
    useClass: PasswordHasher,
  },
];
