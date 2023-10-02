import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const requestE2E = async (
  app: INestApplication,
  path: string,
  method: string,
  status: number,
  body?: object,
  token?: string,
): Promise<request.Response> => {
  return await request(app.getHttpServer())
    [method](path)
    .set('Cookie', [`accessToken=${token}`])
    .set('User-Agent', '')
    .send(body)
    .expect(status);
};
