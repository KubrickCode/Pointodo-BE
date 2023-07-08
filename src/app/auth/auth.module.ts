import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthAppService } from './auth.app.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@domain/auth/auth.service';
import { UserRepository } from '@infrastructure/user/prisma/user.repository';
import { PasswordHasher } from '@infrastructure/user/passwordHasher';
import { PrismaService } from '@infrastructure/services/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@infrastructure/auth/passport/strategies/local.strategy';
import { TokenService } from '@infrastructure/auth/passport/token.service';
import { JwtStrategy } from '@infrastructure/auth/passport/strategies/jwt.strategy';
import { jwtConfig } from 'config/jwt.config';
import { RedisModule } from '@infrastructure/redis/redis.module';
import { RedisService } from '@infrastructure/redis/redis.service';
import { ValidationService } from '@domain/auth/validation.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthAppService,
    AuthService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    RedisService,
    ValidationService,
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
