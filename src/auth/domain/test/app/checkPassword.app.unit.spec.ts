import { IAuthService } from '@auth/domain/interfaces/auth.service.interface';
import { mockAuthService } from './authService.mock';
import { TEST1_USER_LOCAL, TEST_PASSWORD } from '@shared/test/userMockData';
import { ReqCheckPasswordAppDto } from '@auth/domain/dto/checkPassword.app.dto';

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
