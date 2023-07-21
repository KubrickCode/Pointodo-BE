import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BadgeAdminController } from '@interface/controllers/admin/badge.admin.controller';
import { JwtStrategy } from '@infrastructure/auth/passport/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from '@shared/config/jwt.config';

@Module({
  controllers: [BadgeAdminController],
  providers: [JwtStrategy],
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
