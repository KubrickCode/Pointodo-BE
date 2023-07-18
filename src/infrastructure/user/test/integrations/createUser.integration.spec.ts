import { PrismaService } from '@shared/services/prisma.service';
import { UserRepository } from '@infrastructure/user/prisma/user.repository';

describe('UserRepository (Integration)', () => {
  let prisma: PrismaService;
  let userRepository: UserRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    userRepository = new UserRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('createUser', () => {
    it('로컬 유저 생성 In DB', async () => {
      const user = {
        email: 'test@example.com',
        password: 'test1234!@',
      };

      const createdUser = await userRepository.createUser(user);

      const retrievedUser = await prisma.user.findUnique({
        where: { id: createdUser.id },
      });

      expect(retrievedUser).toMatchObject({
        id: createdUser.id,
        email: user.email,
      });
    });
  });
});
