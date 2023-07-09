import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Pointodo API')
  .setDescription('Pointodo swagger 문서')
  .setVersion('1.0.0')
  .addBearerAuth()
  .addTag('Auth', '인증 관련 API')
  .addTag('User', '유저 관련 API')
  .addServer('http://localhost:3000/api')
  .build();
