import { Module } from '@nestjs/common';
import { TaskService } from '../app/task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from '../infrastructure/prisma/task.repository';
import { PrismaService } from '@shared/service/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from '@shared/config/jwt.config';

@Module({
  providers: [
    PrismaService,
    {
      provide: 'ITaskService',
      useClass: TaskService,
    },
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
  ],
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
