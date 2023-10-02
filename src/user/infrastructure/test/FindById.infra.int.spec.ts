import { PrismaService } from '@shared/service/Prisma.service';
import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';
import { UserEntity } from '@user/domain/entities/User.entity';
import { UserRepository } from '@user/infrastructure/prisma/User.repository';
import { plainToClass } from 'class-transformer';

describe('findById', () => {
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
