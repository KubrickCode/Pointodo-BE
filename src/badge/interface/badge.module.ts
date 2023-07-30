import { Module } from '@nestjs/common';
import { BadgeController } from './badge.controller';
import { BadgeService } from '../app/badge.service';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
import { PointRepository } from '@point/infrastructure/prisma/point.repository';
import { PrismaService } from '@shared/service/prisma.service';
import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/badge.admin.repository';

@Module({
  controllers: [BadgeController],
  providers: [
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
      provide: 'IUserBadgeRepository',
      useClass: UserBadgeRepository,
    },
    {
      provide: 'IBadgeAdminRepository',
      useClass: BadgeAdminRepository,
    },
  ],
})
export class BadgeModule {}
