import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  const origin = configService.get<string>('ORIGIN');
  const corsOptions = {
    origin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  await app.listen(3000);
};
bootstrap();
