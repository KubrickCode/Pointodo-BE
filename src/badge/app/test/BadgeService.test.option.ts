import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@shared/utils/Winston.util';
import { RedisCacheModule } from '@cache/interface/Cache.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@shared/config/Jwt.config';
import { BadgeProvider } from '@badge/interface/Badge.provider';
import { BadgeService } from '../Badge.service';
import { BadgeModule } from '@badge/interface/Badge.module';

export const badgeServiceTestModuleOptions = {
  providers: [...BadgeProvider, BadgeService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
    RedisCacheModule,
    BadgeModule,
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
