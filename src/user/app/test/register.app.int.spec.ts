import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@user/app/user.service';
import {
  ReqRegisterAppDto,
  ResRegisterAppDto,
} from '@user/domain/dto/register.app.dto';
import { PrismaService } from '@shared/service/prisma.service';
import { REGISTER_SUCCESS_MESSAGE } from '@shared/messages/user/user.messages';
import { USER_ALREADY_EXIST } from '@shared/messages/user/user.errors';
import { userServiceTestModuleOptions } from './userService.test.option';
import { INestApplication } from '@nestjs/common';

describe('register', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let module: TestingModule;
  let app: INestApplication;

  beforeAll(async () => {
    module = await Test.createTestingModule(
      userServiceTestModuleOptions,
    ).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  const request: ReqRegisterAppDto = {
    email: 'test@test.test',
    password: 'test1234!@',
  };

  it('로컬 유저 생성 -> 리포지토리 -> DB', async () => {
    const expectedResponse: ResRegisterAppDto = {
      message: REGISTER_SUCCESS_MESSAGE,
    };

    const result = await userService.register(request);
    expect(result).toEqual(expectedResponse);
  });

  it('로컬 유저 생성(중복)', async () => {
    try {
      await userService.register(request);
    } catch (error) {
      expect(error.response.statusCode).toEqual(409);
      expect(error.response.message).toEqual(USER_ALREADY_EXIST);
      await prismaService.user.delete({ where: { email: request.email } });
      await prismaService.$disconnect();
    }
  });
});