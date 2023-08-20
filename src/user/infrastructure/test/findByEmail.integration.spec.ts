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
    // const email = 'test@test.test';
    // const user = await userRepository.findByEmail(email);
    // console.log(user);
    // // expect(retrievedUser).toMatchObject({
    // //   id: createdUser.id,
    // //   email: createdUser.email,
    // // });
    // // await prisma.user.delete({ where: { id: createdUser.id } });
  });
});
