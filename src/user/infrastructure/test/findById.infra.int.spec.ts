import { PrismaService } from '@shared/service/prisma.service';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { UserEntity } from '@user/domain/entities/user.entity';
import { UserRepository } from '@user/infrastructure/prisma/user.repository';
import { plainToClass } from 'class-transformer';

describe('', () => {
  let prisma: PrismaService;
  let userRepository: UserRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    userRepository = new UserRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('유저 정보 요청 by ID', async () => {
    const { id } = TEST1_USER_LOCAL;
    const user = await userRepository.findById(id);
    expect(TEST1_USER_LOCAL).toMatchObject(plainToClass(UserEntity, user));
  }, 30000);
});
