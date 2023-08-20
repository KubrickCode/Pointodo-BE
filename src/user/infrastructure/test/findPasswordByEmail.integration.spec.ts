import { PrismaService } from '@shared/service/prisma.service';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

describe('', () => {
  let prisma: PrismaService;
  let userRepository: UserRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    userRepository = new UserRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('', async () => {
    // const id = '1fd96cce-3bcd-4138-aa3b-f54bbee17066';
    // const password = await userRepository.findPasswordById(id);
    // console.log(password);
    // expect(typeof password).toEqual('string');
  });
});
