import { INestApplication } from '@nestjs/common';
import { requestE2E } from './request.e2e';
import { AuthErrorMessage } from '@shared/messages/auth/Auth.errors';
import { ResTokenUnauthorized } from '@auth/interface/dto/TokenError.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const tokenError = async (
  app: INestApplication,
  path: string,
  method: string,
) => {
  const response = await requestE2E(app, path, method, 401, null, 'token');

  expect(response.body.statusCode).toEqual(401);
  expect(response.body.message).toEqual(AuthErrorMessage.AUTH_INVALID_TOKEN);
  expect(response.body.path).toEqual(path);

  await validateOrReject(plainToClass(ResTokenUnauthorized, response.body));
};
