import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { corsOptions } from 'config/cors.config';
import { swaggerConfig } from 'config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  app.use(cookieParser());
  app.enableCors(corsOptions(configService));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
};
bootstrap();
