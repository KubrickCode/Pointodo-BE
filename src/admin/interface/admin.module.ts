import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BadgeAdminController } from '@admin/interface/badge.admin.controller';
import { jwtConfig } from '@shared/config/jwt.config';
import { AuthService } from '@auth/app/auth.service';
import { TokenService } from '@auth/infrastructure/token.service';
import { RedisService } from '@redis/infrastructure/redis.service';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';
import { PrismaService } from '@shared/service/prisma.service';
import { BadgeAdminService } from '@admin/badge/app/badge.admin.service';
import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/badge.admin.repository';
import { CacheService } from '@cache/infrastructure/cache.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from '@shared/utils/multer.options.factory';
import { UserAdminController } from './user.admin.controller';
@Module({
  controllers: [BadgeAdminController, UserAdminController],
  providers: [
    PrismaService,
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    {
      provide: 'ITokenService',
      useClass: TokenService,
    },
    {
      provide: 'IRedisService',
      useClass: RedisService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IBadgeAdminService',
      useClass: BadgeAdminService,
    },
    {
      provide: 'IBadgeAdminRepository',
      useClass: BadgeAdminRepository,
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
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
})
export class AdminModule {}
