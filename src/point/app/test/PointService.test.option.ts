import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@shared/utils/Winston.util';
import { RedisCacheModule } from '@cache/interface/Cache.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@shared/config/Jwt.config';
import { PointProvider } from '@point/interface/Point.provider';
import { PointService } from '../Point.service';
import { PointModule } from '@point/interface/Point.module';

export const pointServiceTestModuleOptions = {
  providers: [...PointProvider, PointService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
    RedisCacheModule,
    PointModule,
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
