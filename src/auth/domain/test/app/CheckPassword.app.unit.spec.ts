import { IAuthService } from '@auth/domain/interfaces/Auth.service.interface';
import { mockAuthService } from './AuthService.mock';
import { TEST1_USER_LOCAL, TEST_PASSWORD } from '@shared/test/UserMockData';
import { ReqCheckPasswordAppDto } from '@auth/domain/dto/CheckPassword.app.dto';

describe('checkPassword', () => {
  const authService: IAuthService = mockAuthService;

  it('비밀번호 체크 성공', async () => {
    const request: ReqCheckPasswordAppDto = {
      id: TEST1_USER_LOCAL.id,
      password: TEST_PASSWORD,
    };
    const response = undefined;
    jest.spyOn(authService, 'checkPassword').mockResolvedValue(response);

    const result = await authService.checkPassword(request);

    expect(result).toEqual(response);
    expect(authService.checkPassword).toHaveBeenCalledWith(request);
  });
});
