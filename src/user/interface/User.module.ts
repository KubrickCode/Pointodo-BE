import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@shared/config/Jwt.config';
import { UserProvider } from './User.provider';

@Module({
  controllers: [UserController],
  providers: UserProvider,
  exports: UserProvider,
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
export class UserModule {}
