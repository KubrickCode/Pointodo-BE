import {
  ReqRegisterAppDto,
  ResRegisterAppDto,
} from '@user/domain/dto/register.app.dto';
import { IUserService } from '@user/domain/interfaces/user.service.interface';
import { REGISTER_SUCCESS_MESSAGE } from '@shared/messages/user/user.messages';

describe('Register', () => {
  let userService: IUserService;

  beforeEach(() => {
    userService = {
      register: jest.fn(),
      getUser: jest.fn(),
      changePassword: jest.fn(),
      deleteUser: jest.fn(),
    };
  });

  it('로컬 회원 가입 성공', async () => {
    const user: ReqRegisterAppDto = {
      email: 'test@test.test',
      password: 'test1234!@',
    };

    const response: ResRegisterAppDto = { message: REGISTER_SUCCESS_MESSAGE };

    jest.spyOn(userService, 'register').mockResolvedValue(response);

    const result = await userService.register(user);

    expect(result).toEqual(response);
    expect(userService.register).toHaveBeenCalledWith(user);
  });
});
