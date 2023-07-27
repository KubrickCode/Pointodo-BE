import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@user/interface/user.module';
import { AuthModule } from '@auth/interface/auth.module';
import { getWinstonLogger } from '@shared/utils/winston.util';
import { WinstonModule } from 'nest-winston';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@shared/filters/globalException.filter';
import { RequestLoggingMiddleware } from '@shared/middlewares/request-logging.middleware';
import { RedisCacheModule } from '@cache/interface/cache.module';
import { AdminModule } from '@admin/interface/admin.module';
import { BadgeModule } from './badge/interface/badge.module';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
