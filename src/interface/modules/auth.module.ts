import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../../app/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '@infrastructure/user/prisma/user.repository';
import { PasswordHasher } from '@infrastructure/user/passwordHasher';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@infrastructure/auth/passport/strategies/local.strategy';
import { TokenService } from '@infrastructure/auth/services/token.service';
import { JwtStrategy } from '@infrastructure/auth/passport/strategies/jwt.strategy';
import { jwtConfig } from 'src/shared/config/jwt.config';
import { RedisModule } from 'src/interface/modules/redis.module';
import { RedisService } from '@infrastructure/redis/redis.service';
import { GoogleStrategy } from '@infrastructure/auth/passport/strategies/google.strategy';
import { KakaoStrategy } from '@infrastructure/auth/passport/strategies/kakao.strategy';
import { CacheService } from '@infrastructure/cache/cache.service';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    KakaoStrategy,
    RedisService,
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
    PassportModule,
    RedisModule,
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
