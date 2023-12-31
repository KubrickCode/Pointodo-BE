import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Pointodo API')
  .setDescription('Pointodo swagger 문서')
  .setVersion('1.0.0')
  .addCookieAuth(
    'auth-cookie',
    {
      name: 'accessToken',
      type: 'apiKey',
      in: 'cookie',
      scheme: 'Bearer',
    },
    'accessToken',
  )
  .addCookieAuth(
    'auth-cookie',
    {
      name: 'refreshToken',
      type: 'apiKey',
      in: 'cookie',
      scheme: 'Bearer',
    },
    'refreshToken',
  )
  .addTag('Auth', '인증 관련 API')
  .addTag('User', '유저 관련 API')
  .addTag('Task', '작업 관련 API')
  .addTag('Point', '포인트 관련 API')
  .addTag('Badge', '뱃지 관련 API')
  .addTag('Admin - Badge', '관리자(뱃지) 관련 API')
  .addServer('http://localhost:3000/api')
  .build();

export const swaggerAuthConfig = {
  challenge: true,
  users: {
    [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
  },
};

export const swaggerEndPoint = '/api/docs';
