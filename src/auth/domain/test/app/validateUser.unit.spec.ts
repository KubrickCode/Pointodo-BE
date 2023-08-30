import { IAuthService } from '@auth/domain/interfaces/auth.service.interface';
import { mockAuthService } from './authService.mock';
import {
  ReqValidateUserAppDto,
  ResValidateUserAppDto,
} from '@auth/domain/dto/vaildateUser.app.dto';

describe('ValidateUser', () => {
  const authService: IAuthService = mockAuthService;

  it('유저 인증 성공', async () => {
    const request: ReqValidateUserAppDto = {
      email: 'test@test.test',
      password: 'test1234!@',
    };

    const response: ResValidateUserAppDto = {
      id: 'uuid-uuid-uuid-uuid-uuid',
      email: 'test@test.test',
      provider: 'LOCAL',
      role: 'USER',
      selectedBadgeId: 1,
      createdAt: new Date(),
    };

    jest.spyOn(authService, 'validateUser').mockResolvedValue(response);

    const result = await authService.validateUser(request);

    expect(result).toEqual(response);
    expect(authService.validateUser).toHaveBeenCalledWith(request);
  });
});
