import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BadgeAdminController } from '@admin/interface/badge.admin.controller';
import { jwtConfig } from '@shared/config/jwt.config';
import { AuthService } from '@auth/app/auth.service';
import { TokenService } from '@auth/infrastructure/token.service';
import { RedisService } from '@redis/infrastructure/redis.service';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';
import { PasswordHasher } from '@user/infrastructure/passwordHasher';
import { PrismaService } from '@shared/service/prisma.service';
import { BadgeAdminService } from '@admin/badge/app/badge.admin.service';
import { BadgeAdminRepository } from '@admin/badge/infrastructure/prisma/badge.admin.repository';
import { PointAdminController } from '@admin/interface/point.admin.controller';
import { PointAdminService } from '@admin/point/app/point.admin.service';
import { PointAdminRepository } from '@admin/point/infrastructure/prisma/point.admin.repository';
import { TaskAdminController } from '@admin/interface/task.admin.controller';
import { TaskAdminService } from '@admin/task/app/task.admin.service';
import { TaskAdminRepository } from '@admin/task/infrastructure/prisma/task.admin.repository';
@Module({
  controllers: [
    BadgeAdminController,
    PointAdminController,
    TaskAdminController,
  ],
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
    {
      provide: 'ITaskAdminService',
      useClass: TaskAdminService,
    },
    {
      provide: 'ITaskAdminRepository',
      useClass: TaskAdminRepository,
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
