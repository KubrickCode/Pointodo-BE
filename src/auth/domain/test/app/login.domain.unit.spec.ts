import { IAuthService } from '@auth/domain/interfaces/auth.service.interface';
import { mockAuthService } from './authService.mock';
import { ReqLoginAppDto, ResLoginAppDto } from '@auth/domain/dto/login.app.dto';

describe('Login', () => {
  const authService: IAuthService = mockAuthService;

  it('로그인 성공', async () => {
    const request: ReqLoginAppDto = {
      id: 'uuid',
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
