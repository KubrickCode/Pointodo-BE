import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
import { CacheService } from '@cache/infrastructure/cache.service';
import { RedisService } from '@redis/infrastructure/redis.service';
import { ProviderConstant } from '@shared/constants/provider.constant';
import { PrismaService } from '@shared/service/prisma.service';
import { PasswordHasher } from '@shared/utils/passwordHasher';
import { UserService } from '@user/app/user.service';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

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
