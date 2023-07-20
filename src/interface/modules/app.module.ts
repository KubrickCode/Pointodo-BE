import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/interface/modules/user.module';
import { AuthModule } from 'src/interface/modules/auth.module';
import { getWinstonLogger } from '../../shared/utils/winston.util';
import { WinstonModule } from 'nest-winston';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '../../shared/filters/globalException.filter';
import { RequestLoggingMiddleware } from 'src/shared/middlewares/request-logging.middleware';
import { RedisCacheModule } from './cache.module';

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
    RedisCacheModule,
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
