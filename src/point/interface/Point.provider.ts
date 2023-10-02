import { CacheService } from '@cache/infrastructure/Cache.service';
import { PointService } from '@point/app/Point.service';
import { PointRepository } from '@point/infrastructure/prisma/Point.repository';
import { ProviderConstant } from '@shared/constants/Provider.constant';
import { PrismaService } from '@shared/service/Prisma.service';
import { HandleDateTime } from '@shared/utils/HandleDateTime';
import { UserRepository } from '@user/infrastructure/prisma/User.repository';

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
