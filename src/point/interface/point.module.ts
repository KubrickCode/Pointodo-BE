import { Module } from '@nestjs/common';
import { PointService } from '../app/point.service';
import { PointController } from './point.controller';
import { PointRepository } from '@point/infrastructure/prisma/point.repository';
import { PrismaService } from '@shared/service/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from '@shared/config/jwt.config';
import { CacheService } from '@cache/infrastructure/cache.service';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

@Module({
  providers: [
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
  ],
  controllers: [PointController],
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
export class PointModule {}
