import { PrismaService } from '@shared/service/prisma.service';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

describe('getTopUserOfMonth', () => {
  let prisma: PrismaService;
  let userRepository: UserRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    userRepository = new UserRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('이달의 유저 반환', async () => {
    const result = await userRepository.getTopUsersOnDate(
      '2023-08-01',
      '2023-09-01',
    );

    console.log(result);
  }, 30000);
});
