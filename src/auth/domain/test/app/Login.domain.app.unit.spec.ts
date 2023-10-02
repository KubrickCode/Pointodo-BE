import { IAuthService } from '@auth/domain/interfaces/Auth.service.interface';
import { mockAuthService } from './AuthService.mock';
import { ReqLoginAppDto, ResLoginAppDto } from '@auth/domain/dto/Login.app.dto';
import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';

describe('Login', () => {
  const authService: IAuthService = mockAuthService;

  it('로그인 성공', async () => {
    const request: ReqLoginAppDto = {
      id: TEST1_USER_LOCAL.id,
      ip: '',
      device: {
        browser: '',
        os: '',
        platform: '',
        version: '',
      },
    };

    const response: ResLoginAppDto = {
      accessToken: 'jwtAccessToken',
      refreshToken: 'jwtRefreshToken',
    };

    jest.spyOn(authService, 'login').mockResolvedValue(response);

    const result = await authService.login(request);

    expect(result).toEqual(response);
    expect(authService.login).toHaveBeenCalledWith(request);
  });
});
