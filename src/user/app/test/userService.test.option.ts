import { PrismaService } from '@shared/service/prisma.service';
import { UserService } from '../user.service';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';
import { CacheService } from '@cache/infrastructure/cache.service';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
import { RedisService } from '@redis/infrastructure/redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@shared/utils/winston.util';
import { RedisCacheModule } from '@cache/interface/cache.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@shared/config/jwt.config';

export const userServiceTestModuleOptions = {
  providers: [
    PrismaService,
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'ICacheService',
      useClass: CacheService,
    },
    {
      provide: 'IUserBadgeRepository',
      useClass: UserBadgeRepository,
    },
    {
      provide: 'IRedisService',
      useClass: RedisService,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
    RedisCacheModule,
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
};
