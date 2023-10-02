import { PrismaService } from '@shared/service/Prisma.service';
import { MOCK_USER, TEST_PASSWORD } from '@shared/test/UserMockData';
import { UserRepository } from '@user/infrastructure/prisma/User.repository';

describe('createUser', () => {
  let prisma: PrismaService;
  let userRepository: UserRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    userRepository = new UserRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const user = {
    email: MOCK_USER.email,
    password: TEST_PASSWORD,
  };

  it('로컬 유저 생성 In DB', async () => {
    const createdUser = await userRepository.createUser(
      user.email,
      user.password,
    );

    const retrievedUser = await userRepository.findById(createdUser.id);

    expect(retrievedUser).toMatchObject({
      id: createdUser.id,
      email: createdUser.email,
    });
  }, 30000);

  it('로컬 유저 충돌 In DB', async () => {
    try {
      const existUser = await userRepository.findByEmail(user.email);
      expect(existUser).toMatchObject({
        email: user.email,
      });

      await userRepository.createUser(user.email, user.password);
    } catch (error) {
      await prisma.user.delete({ where: { email: user.email } });
    }
  }, 30000);
});
