import { Test, TestingModule } from '@nestjs/testing';
import { authServiceTestModuleOptions } from './authService.test.option';
import { AuthService } from '../auth.service';
import {
  TEST1_USER_LOCAL,
  TEST2_USER_GOOGLE,
  TEST_PASSWORD,
} from '@shared/test/userMockData';
import { ReqCheckPasswordAppDto } from '@auth/domain/dto/checkPassword.app.dto';
import { HttpStatus } from '@nestjs/common';
import { AuthErrorMessage } from '@shared/messages/auth/auth.errors';
import { UserErrorMessage } from '@shared/messages/user/user.errors';

describe('checkPassword', () => {
  let authService: AuthService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule(
      authServiceTestModuleOptions,
    ).compile();

    authService = module.get<AuthService>(AuthService);

    await module.init();
  }, 30000);

  afterAll(async () => {
    await module.close();
  });

  const request: ReqCheckPasswordAppDto = {
    id: TEST1_USER_LOCAL.id,
    password: TEST_PASSWORD,
  };

  it('비밀번호 체크 성공', async () => {
    const result = await authService.checkPassword(request);

    expect(result).toEqual(undefined);
  }, 30000);

  it('비밀번호 체크 실패 - 불일치', async () => {
    try {
      await authService.checkPassword({
        ...request,
        password: 'test4321!@',
      });
    } catch (error) {
      expect(error.response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
      expect(error.response.message).toEqual(
        AuthErrorMessage.AUTH_INVALID_PASSWORD,
      );
      expect(error.response.error).toEqual('Unauthorized');
    }
  }, 30000);

  it('비밀번호 체크 실패 - 소셜 계정', async () => {
    try {
      await authService.checkPassword({
        ...request,
        id: TEST2_USER_GOOGLE.id,
      });
    } catch (error) {
      expect(error.response.statusCode).toEqual(HttpStatus.CONFLICT);
      expect(error.response.message).toEqual(
        UserErrorMessage.USER_EXIST_WITH_SOCIAL,
      );
      expect(error.response.error).toEqual('Conflict');
    }
  }, 30000);
});
