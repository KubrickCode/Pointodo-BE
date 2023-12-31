import { PrismaService } from '@shared/service/prisma.service';
import { TEST1_USER_LOCAL, TEST_PASSWORD } from '@shared/test/userMockData';
import { PasswordHasher } from '@shared/utils/passwordHasher';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

describe('findPasswordById', () => {
  let prisma: PrismaService;
  let userRepository: UserRepository;
  let passwordHasher: PasswordHasher;

  beforeAll(() => {
    prisma = new PrismaService();
    userRepository = new UserRepository(prisma);
    passwordHasher = new PasswordHasher();
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('유저 패스워드 요청 by ID', async () => {
    const { id } = TEST1_USER_LOCAL;
    const password = await userRepository.findPasswordById(id);
    const result = await passwordHasher.comparePassword(
      TEST_PASSWORD,
      password,
    );
    expect(result).toBeTruthy();
  }, 30000);
});
