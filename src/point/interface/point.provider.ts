import { CacheService } from '@cache/infrastructure/cache.service';
import { PointService } from '@point/app/point.service';
import { PointRepository } from '@point/infrastructure/prisma/point.repository';
import {
  ICACHE_SERVICE,
  IHANDLE_DATE_TIME,
  IPOINT_REPOSITORY,
  IPOINT_SERVICE,
  IUSER_REPOSITORY,
} from '@shared/constants/provider.constant';
import { PrismaService } from '@shared/service/prisma.service';
import { HandleDateTime } from '@shared/utils/handleDateTime';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

export const PointProvider = [
  PrismaService,
  {
    provide: IPOINT_SERVICE,
    useClass: PointService,
  },
  {
    provide: IPOINT_REPOSITORY,
    useClass: PointRepository,
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
    provide: IHANDLE_DATE_TIME,
    useClass: HandleDateTime,
  },
];
