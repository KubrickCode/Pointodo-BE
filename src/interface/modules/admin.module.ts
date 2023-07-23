import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BadgeAdminController } from '@interface/controllers/admin/badge.admin.controller';
import { jwtConfig } from '@shared/config/jwt.config';
import { AuthService } from '@app/auth/auth.service';
import { TokenService } from '@infrastructure/auth/services/token.service';
import { RedisService } from '@infrastructure/redis/redis.service';
import { UserRepository } from '@infrastructure/user/prisma/user.repository';
import { PasswordHasher } from '@infrastructure/user/passwordHasher';
import { PrismaService } from '@shared/services/prisma.service';
import { BadgeAdminService } from '@app/admin/badge/badge.admin.service';
import { BadgeAdminRepository } from '@infrastructure/admin/badge/prisma/badge.admin.repository';
import { PointAdminController } from '@interface/controllers/admin/point.admin.controller';
import { PointAdminService } from '@app/admin/point/point.admin.service';
import { PointAdminRepository } from '@infrastructure/admin/point/prisma/point.admin.repository';
@Module({
  controllers: [BadgeAdminController, PointAdminController],
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
      provide: 'IPasswordHasher',
      useClass: PasswordHasher,
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
      provide: 'IPointAdminService',
      useClass: PointAdminService,
    },
    {
      provide: 'IPointAdminRepository',
      useClass: PointAdminRepository,
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
export class AdminModule {}
