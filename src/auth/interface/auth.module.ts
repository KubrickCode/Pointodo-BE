import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../app/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';
import { PasswordHasher } from '@user/infrastructure/passwordHasher';
import { PrismaService } from '@shared/service/prisma.service';
import { LocalStrategy } from '@auth/infrastructure/passport/strategies/local.strategy';
import { TokenService } from '@auth/infrastructure/token.service';
import { JwtStrategy } from '@auth/infrastructure/passport/strategies/jwt.strategy';
import { jwtConfig } from '@shared/config/jwt.config';
import { RedisService } from '@redis/infrastructure/redis.service';
import { GoogleStrategy } from '@auth/infrastructure/passport/strategies/google.strategy';
import { KakaoStrategy } from '@auth/infrastructure/passport/strategies/kakao.strategy';
import { CacheService } from '@cache/infrastructure/cache.service';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    KakaoStrategy,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IPasswordHasher',
      useClass: PasswordHasher,
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
      provide: 'IAuthService',
      useClass: AuthService,
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
export class AuthModule {}