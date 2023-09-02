import { IAuthService } from '@auth/domain/interfaces/auth.service.interface';
import { mockAuthService } from './authService.mock';
import { ReqLoginAppDto, ResLoginAppDto } from '@auth/domain/dto/login.app.dto';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';

describe('Login', () => {
  const authService: IAuthService = mockAuthService;

  it('로그인 성공', async () => {
    const request: ReqLoginAppDto = {
      id: TEST1_USER_LOCAL.id,
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
