import { PrismaService } from '@shared/service/prisma.service';
import { PointRepository } from '../prisma/point.repository';
import { HandleDateTime } from '@shared/utils/handleDateTime';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';

describe('calculateUserPoints', () => {
  let prisma: PrismaService;
  let handleDateTime: HandleDateTime;
  let pointRepository: PointRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    handleDateTime = new HandleDateTime();
    pointRepository = new PointRepository(prisma, handleDateTime);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('유저 보유 포인트 계산', async () => {
    const userId = TEST1_USER_LOCAL.id;
    const result = await pointRepository.calculateUserPoints(userId);

    expect(result).toEqual(0);
  });
});
