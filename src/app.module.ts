import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from '@app/auth/auth.module';
import { getWinstonLogger } from './shared/utils/winston.util';
import { WinstonModule } from 'nest-winston';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './app/filters/globalException.filter';
import { RequestLoggingMiddleware } from '@app/middlewares/request-logging.middleware';

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
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'api')),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
