import { UserService } from '../user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@shared/utils/winston.util';
import { RedisCacheModule } from '@cache/interface/cache.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@shared/config/jwt.config';
import { UserModule } from '@user/interface/user.module';
import { UserProvider } from '@user/interface/user.provider';

export const userServiceTestModuleOptions = {
  providers: [...UserProvider, UserService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
    RedisCacheModule,
    UserModule,
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
