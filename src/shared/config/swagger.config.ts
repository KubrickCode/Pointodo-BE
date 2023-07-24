import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Pointodo API')
  .setDescription('Pointodo swagger 문서')
  .setVersion('1.0.0')
  .addBearerAuth()
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
  .addTag('Admin - Badge', '관리자(뱃지) 관련 API')
  .addTag('Admin - Point', '관리자(포인트) 관련 API')
  .addTag('Admin - Task', '관리자(작업) 관련 API')
  .addServer('http://localhost:3000/api')
  .build();
