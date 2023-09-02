import { IAuthService } from '@auth/domain/interfaces/auth.service.interface';
import { mockAuthService } from './authService.mock';
import {
  ReqValidateUserAppDto,
  ResValidateUserAppDto,
} from '@auth/domain/dto/vaildateUser.app.dto';
import { TEST1_USER_LOCAL, TEST_PASSWORD } from '@shared/test/userMockData';

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
