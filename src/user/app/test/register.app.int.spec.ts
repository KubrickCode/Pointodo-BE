import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@user/app/user.service';
import { ReqRegisterAppDto } from '@user/domain/dto/register.app.dto';
import { PrismaService } from '@shared/service/prisma.service';
import { USER_ALREADY_EXIST } from '@shared/messages/user/user.errors';
import { userServiceTestModuleOptions } from './userService.test.option';
import { MOCK_USER, TEST_PASSWORD } from '@shared/test/userMockData';

describe('register', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule(
      userServiceTestModuleOptions,
    ).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);

    await module.init();
  }, 30000);

  afterAll(async () => {
    await module.close();
  });

  const request: ReqRegisterAppDto = {
    email: MOCK_USER.email,
    password: TEST_PASSWORD,
  };

  it('로컬 유저 생성 -> 리포지토리 -> DB', async () => {
    await userService.register(request);
  }, 30000);

  it('로컬 유저 생성(중복)', async () => {
    try {
      await userService.register(request);
    } catch (error) {
      expect(error.response.statusCode).toEqual(409);
      expect(error.response.message).toEqual(USER_ALREADY_EXIST);
      await prismaService.user.delete({ where: { email: request.email } });
    }
  }, 30000);
});
