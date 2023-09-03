import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { corsOptions } from '@shared/config/cors.config';
import {
  swaggerAuthConfig,
  swaggerConfig,
  swaggerEndPoint,
} from '@shared/config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { helmetOptions } from '@shared/config/helmet.config';
import basicAuth from 'express-basic-auth';
import csurf from 'csurf';
import { csrfConfg } from '@shared/config/csrf.config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(swaggerEndPoint, basicAuth(swaggerAuthConfig));
  const configService = app.get(ConfigService);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(swaggerEndPoint, app, document);

  app.use(cookieParser());

  app.use(csurf(csrfConfg.csrfOption));

  app.use(csrfConfg.csrfMiddleWare);

  app.use(helmet(helmetOptions));
  app.enableCors(corsOptions(configService));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(3000);
};
bootstrap();
