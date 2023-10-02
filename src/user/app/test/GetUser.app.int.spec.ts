import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@user/app/User.service';
import { userServiceTestModuleOptions } from './UserService.test.option';
import {
  ReqGetUserAppDto,
  ResGetUserAppDto,
} from '@user/domain/dto/GetUser.app.dto';
import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from 'crypto';
import { UserErrorMessage } from '@shared/messages/user/User.errors';
import { plainToClass } from 'class-transformer';

describe('getUser', () => {
  let userService: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule(
      userServiceTestModuleOptions,
    ).compile();

    userService = module.get<UserService>(UserService);

    await module.init();
  }, 30000);

  afterAll(async () => {
    await module.close();
  });

  const req: ReqGetUserAppDto = {
    id: TEST1_USER_LOCAL.id,
  };

  it('유저 조회 APP에서 FROM DB', async () => {
    const expectedResponse = {
      ...TEST1_USER_LOCAL,
      iconLink: TEST1_USER_LOCAL.selectedBadge.iconLink,
    };

    const user = await userService.getUser(req);
    expect(user).toEqual(plainToClass(ResGetUserAppDto, expectedResponse));
    expect(user).toBeInstanceOf(ResGetUserAppDto);
  }, 30000);

  it('유저 조회 APP에서 FROM DB 실패 - 존재하지 않는 계정', async () => {
    try {
      await userService.getUser({ id: uuidv4() as UUID });
    } catch (error) {
      expect(error.response.statusCode).toEqual(404);
      expect(error.response.message).toEqual(UserErrorMessage.USER_NOT_FOUND);
      expect(error.response.error).toEqual('Not Found');
    }
  }, 30000);
});
