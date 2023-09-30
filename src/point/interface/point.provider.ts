import { CacheService } from '@cache/infrastructure/cache.service';
import { PointService } from '@point/app/point.service';
import { PointRepository } from '@point/infrastructure/prisma/point.repository';
import { ProviderConstant } from '@shared/constants/provider.constant';
import { PrismaService } from '@shared/service/prisma.service';
import { HandleDateTime } from '@shared/utils/handleDateTime';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

export const PointProvider = [
  PrismaService,
  {
    provide: ProviderConstant.IPOINT_SERVICE,
    useClass: PointService,
  },
  {
    provide: ProviderConstant.IPOINT_REPOSITORY,
    useClass: PointRepository,
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
    provide: ProviderConstant.IHANDLE_DATE_TIME,
    useClass: HandleDateTime,
  },
];
