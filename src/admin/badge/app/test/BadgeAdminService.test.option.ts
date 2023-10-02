import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@shared/utils/Winston.util';
import { RedisCacheModule } from '@cache/interface/Cache.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@shared/config/Jwt.config';
import { AdminProvider } from '@admin/interface/Admin.provider';
import { BadgeAdminService } from '../Badge.admin.service';
import { AdminModule } from '@admin/interface/Admin.module';

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
