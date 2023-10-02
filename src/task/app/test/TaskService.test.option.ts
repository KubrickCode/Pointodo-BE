import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@shared/utils/Winston.util';
import { RedisCacheModule } from '@cache/interface/Cache.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@shared/config/Jwt.config';
import { TaskModule } from '@task/interface/Task.module';
import { TaskProvider } from '@task/interface/Task.provider';
import { TaskService } from '../Task.service';

export const taskServiceTestModuleOptions = {
  providers: [...TaskProvider, TaskService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
    RedisCacheModule,
    TaskModule,
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
