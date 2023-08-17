import { PrismaService } from '@shared/service/prisma.service';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';

describe('createUser', () => {
  let prisma: PrismaService;
  let userRepository: UserRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    userRepository = new UserRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('유저 정보 요청 by ID', async () => {
    const id = '93d13ee4-1e0b-47bd-a350-95b6f3421605';

    const user = await userRepository.findById(id);

    console.log(user);

    // expect(retrievedUser).toMatchObject({
    //   id: createdUser.id,
    //   email: createdUser.email,
    // });

    // await prisma.user.delete({ where: { id: createdUser.id } });
  });
});
