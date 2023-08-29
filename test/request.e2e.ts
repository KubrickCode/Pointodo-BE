import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

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
    .send(body)
    .expect(status);
};
