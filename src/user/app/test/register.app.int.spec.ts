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
import { USER_ALREADY_EXIST } from '@shared/messages/user/user.errors';

describe('UserService Integration', () => {
  let userService: UserService;
  let prismaService: PrismaService;

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
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('register', () => {
    const request: ReqRegisterAppDto = {
      email: 'test@test.test',
      password: 'test1234!@',
    };
    it('로컬 유저 생성 -> 리포지토리 -> DB', async () => {
      const expectedResponse: ResRegisterAppDto = {
        message: REGISTER_SUCCESS_MESSAGE,
      };

      const result = await userService.register(request);
      expect(result).toEqual(expectedResponse);
    });

    it('로컬 유저 생성(중복)', async () => {
      try {
        await userService.register(request);
      } catch (error) {
        expect(error.response.statusCode).toEqual(409);
        expect(error.response.message).toEqual(USER_ALREADY_EXIST);
        await prismaService.user.delete({ where: { email: request.email } });
      }
    });
  });
});
