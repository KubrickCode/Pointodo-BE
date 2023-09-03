import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { corsOptions } from '@shared/config/cors.config';
import { swaggerConfig } from '@shared/config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { helmetOptions } from '@shared/config/helmet.config';
import basicAuth from 'express-basic-auth';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  app.use(cookieParser());
  app.use(helmet(helmetOptions));
  app.use(
    basicAuth({
      users: { someuser: 'somepassword' },
      challenge: true,
      realm: 'Imb4T3st4pp',
    }),
  );
  app.enableCors(corsOptions(configService));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(3000);
};
bootstrap();
