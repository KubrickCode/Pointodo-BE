import { IAuthService } from '@auth/domain/interfaces/Auth.service.interface';
import { mockAuthService } from './AuthService.mock';
import {
  ReqValidateUserAppDto,
  ResValidateUserAppDto,
} from '@auth/domain/dto/VaildateUser.app.dto';
import { TEST1_USER_LOCAL, TEST_PASSWORD } from '@shared/test/UserMockData';

describe('ValidateUser', () => {
  const authService: IAuthService = mockAuthService;

  it('유저 인증 성공', async () => {
    const request: ReqValidateUserAppDto = {
      email: TEST1_USER_LOCAL.email,
      password: TEST_PASSWORD,
    };

    const response: ResValidateUserAppDto = TEST1_USER_LOCAL;

    jest.spyOn(authService, 'validateUser').mockResolvedValue(response);

    const result = await authService.validateUser(request);

    expect(result).toEqual(response);
    expect(authService.validateUser).toHaveBeenCalledWith(request);
  });
});
