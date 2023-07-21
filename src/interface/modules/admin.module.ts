import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BadgeAdminController } from '@interface/controllers/admin/badge.admin.controller';
import { JwtStrategy } from '@infrastructure/auth/passport/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from '@shared/config/jwt.config';
import { AuthService } from '@app/auth/auth.service';
import { TokenService } from '@infrastructure/auth/services/token.service';
import { RedisService } from '@infrastructure/redis/redis.service';
import { UserRepository } from '@infrastructure/user/prisma/user.repository';
import { PasswordHasher } from '@infrastructure/user/passwordHasher';
import { PrismaService } from '@shared/services/prisma.service';
@Module({
  controllers: [BadgeAdminController],
  providers: [
    JwtStrategy,
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
  ],
  imports: [
    PassportModule,
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
