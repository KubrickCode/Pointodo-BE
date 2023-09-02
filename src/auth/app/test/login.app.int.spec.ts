import { Test, TestingModule } from '@nestjs/testing';
import { authServiceTestModuleOptions } from './authService.test.option';
import { AuthService } from '../auth.service';
import { ReqLoginAppDto, ResLoginAppDto } from '@auth/domain/dto/login.app.dto';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';

describe('login', () => {
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

  const request: ReqLoginAppDto = {
    id: TEST1_USER_LOCAL.id,
  };

  it('로그인 성공', async () => {
    const loginSpy = jest.spyOn(authService, 'login');
    const result: ResLoginAppDto = await authService.login(request);

    expect(loginSpy).toHaveBeenCalledWith(request);
    expect(result).toBeInstanceOf(ResLoginAppDto);
  }, 30000);
});
