import { ReqRegisterAppDto } from '@user/domain/dto/Register.app.dto';
import { IUserService } from '@user/domain/interfaces/User.service.interface';
import { mockUserService } from './UserService.mock';
import { MOCK_USER, TEST_PASSWORD } from '@shared/test/UserMockData';

describe('Register', () => {
  const userService: IUserService = mockUserService;

  it('로컬 회원 가입 성공', async () => {
    const user: ReqRegisterAppDto = {
      email: MOCK_USER.email,
      password: TEST_PASSWORD,
    };

    await userService.register(user);

    expect(userService.register).toHaveBeenCalledWith(user);
  });
});
