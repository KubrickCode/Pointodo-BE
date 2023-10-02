import { Module } from '@nestjs/common';
import { BadgeController } from './Badge.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@shared/config/Jwt.config';
import { ConfigService } from '@nestjs/config';

import { BadgeProvider } from './Badge.provider';

@Module({
  controllers: [BadgeController],
  providers: BadgeProvider,
  exports: BadgeProvider,
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
export class BadgeModule {}
