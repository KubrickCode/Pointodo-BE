import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@user/interface/User.module';
import { AuthModule } from '@auth/interface/Auth.module';
import { getWinstonLogger } from '@shared/utils/Winston.util';
import { WinstonModule } from 'nest-winston';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from '@shared/filters/GlobalException.filter';
import { RequestLoggingMiddleware } from '@shared/middlewares/RequestLogging.middleware';
import { RedisCacheModule } from '@cache/interface/Cache.module';
import { AdminModule } from '@admin/interface/Admin.module';
import { BadgeModule } from './badge/interface/Badge.module';
import { TaskModule } from './task/interface/Task.module';
import { PointModule } from './point/interface/Point.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { throttlerConfig } from '@shared/config/Throttler.config';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    AdminModule,
    RedisCacheModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
    BadgeModule,
    TaskModule,
    PointModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot(throttlerConfig.throttlerOption),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
