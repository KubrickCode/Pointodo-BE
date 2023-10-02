import { Module } from '@nestjs/common';
import { TaskController } from './Task.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from '@shared/config/Jwt.config';
import { TaskProvider } from './Task.provider';

@Module({
  providers: TaskProvider,
  controllers: [TaskController],
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
export class TaskModule {}
