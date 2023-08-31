import { TEST1_USER_LOCAL, TEST_PASSWORD } from '@shared/test/userMockData';
import { requestE2E } from './request.e2e';
import { INestApplication } from '@nestjs/common';

export const setupLoggedIn = async (app: INestApplication) => {
  const loginResult = await requestE2E(app, '/auth/login', 'post', 201, {
    email: TEST1_USER_LOCAL.email,
    password: TEST_PASSWORD,
  });
  return loginResult.headers['set-cookie']
    .find((cookie: string) => cookie.includes('accessToken'))
    .split('accessToken=')[1]
    .split(';')[0];
};
