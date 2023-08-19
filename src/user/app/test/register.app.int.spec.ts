import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@user/app/user.service';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';
import {
  ReqRegisterAppDto,
  ResRegisterAppDto,
} from '@user/domain/dto/register.app.dto';
import { PrismaService } from '@shared/service/prisma.service';
import { CacheService } from '@cache/infrastructure/cache.service';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
import { RedisService } from '@redis/infrastructure/redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { RedisCacheModule } from '@cache/interface/cache.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@shared/config/jwt.config';
import { getWinstonLogger } from '@shared/utils/winston.util';
import { REGISTER_SUCCESS_MESSAGE } from '@shared/messages/user/user.messages';

describe('UserService Integration', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const request: ReqRegisterAppDto = {
        email: 'test5@example.com',
        password: 'test1234!@',
      };

      const expectedResponse: ResRegisterAppDto = {
        message: REGISTER_SUCCESS_MESSAGE,
      };

      const result = await userService.register(request);
      expect(result).toEqual(expectedResponse);
    });
  });
});
