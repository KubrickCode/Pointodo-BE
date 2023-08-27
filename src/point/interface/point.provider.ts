import { CacheService } from '@cache/infrastructure/cache.service';
import { PointService } from '@point/app/point.service';
import { PointRepository } from '@point/infrastructure/prisma/point.repository';
import { PrismaService } from '@shared/service/prisma.service';
import { HandleDateTime } from '@shared/utils/handleDateTime';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

export const PointProvider = [
  PrismaService,
  {
    provide: 'IPointService',
    useClass: PointService,
  },
  {
    provide: 'IPointRepository',
    useClass: PointRepository,
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
    provide: 'IHandleDateTime',
    useClass: HandleDateTime,
  },
];
