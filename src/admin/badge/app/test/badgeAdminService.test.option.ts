import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@shared/utils/winston.util';
import { RedisCacheModule } from '@cache/interface/cache.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@shared/config/jwt.config';
import { AdminProvider } from '@admin/interface/admin.provider';
import { BadgeAdminService } from '../badge.admin.service';
import { AdminModule } from '@admin/interface/admin.module';

export const badgeAdminServiceTestModuleOptions = {
  providers: [...AdminProvider, BadgeAdminService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
    RedisCacheModule,
    AdminModule,
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
