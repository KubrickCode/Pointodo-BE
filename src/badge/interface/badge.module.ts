import { Module } from '@nestjs/common';
import { BadgeController } from './badge.controller';
import { BadgeService } from '../app/badge.service';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
import { PointRepository } from '@point/infrastructure/prisma/point.repository';
import { PrismaService } from '@shared/service/prisma.service';
import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/badge.admin.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@shared/config/jwt.config';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';
import { BadgeProgressRepository } from '@badge/infrastructure/prisma/badgeProgress.repository';
import { CacheService } from '@cache/infrastructure/cache.service';

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
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IUserBadgeRepository',
      useClass: UserBadgeRepository,
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
  ],
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: jwtConfig(configService).accessTokenSecret,
        signOptions: {
          expiresIn: jwtConfig(configService).accessTokenExpiration,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class BadgeModule {}
