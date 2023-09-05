import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@user/app/user.service';
import { userServiceTestModuleOptions } from './userService.test.option';
import {
  ReqGetTopUsersOnDateAppDto,
  ResGetTopUsersOnDateAppDto,
} from '@user/domain/dto/getTopUsersOnDate.app.dto';

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

  const req: ReqGetTopUsersOnDateAppDto = {
    startDate: '2023-08-01',
    endDate: '2023-09-01',
  };

  it('유저 조회 APP에서 FROM DB', async () => {
    const result = await userService.getTopUsersOnDate(req);
    result.forEach((item) => {
      expect(item).toBeInstanceOf(ResGetTopUsersOnDateAppDto);
    });
  }, 30000);
});
