import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { corsOptions } from '@shared/config/Cors.config';
import {
  swaggerAuthConfig,
  swaggerConfig,
  swaggerEndPoint,
} from '@shared/config/Swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import basicAuth from 'express-basic-auth';
import csurf from 'csurf';
import { csrfConfig } from '@shared/config/Csrf.config';
import { helmetConfig } from '@shared/config/Helmet.config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(swaggerEndPoint, basicAuth(swaggerAuthConfig));
  const configService = app.get(ConfigService);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(swaggerEndPoint, app, document);

  app.use(cookieParser());

  if (process.env.NODE_ENV === 'production') {
    app.use(csurf(csrfConfig.csrfOption));
    app.use(csrfConfig.csrfMiddleWare);
  }

  app.use(helmet(helmetConfig.helmetOptions));
  app.enableCors(corsOptions(configService));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(3000);
};
bootstrap();
