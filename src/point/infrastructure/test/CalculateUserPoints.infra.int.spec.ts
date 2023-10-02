import { PrismaService } from '@shared/service/Prisma.service';
import { PointRepository } from '../prisma/Point.repository';
import { HandleDateTime } from '@shared/utils/HandleDateTime';
import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';

describe('calculateUserPoints', () => {
  let prisma: PrismaService;
  let handleDateTime: HandleDateTime;
  let pointRepository: PointRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    handleDateTime = new HandleDateTime();
    pointRepository = new PointRepository(prisma, handleDateTime);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('유저 보유 포인트 계산', async () => {
    const userId = TEST1_USER_LOCAL.id;
    const result = await pointRepository.calculateUserPoints(userId);

    expect(result).toEqual(0);
  }, 30000);
});
