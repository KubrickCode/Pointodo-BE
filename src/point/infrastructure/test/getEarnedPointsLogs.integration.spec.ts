import { PrismaService } from '@shared/service/prisma.service';
import { PointRepository } from '../prisma/point.repository';

describe('calculateUserPoints', () => {
  let prisma: PrismaService;
  let pointRepository: PointRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    pointRepository = new PointRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('적립 포인트 내역', async () => {
    const userId = '0030cc64-b54f-4e75-95a5-1379b6928f7e';
    const result = await pointRepository.getEarnedPointsLogs(
      userId,
      5,
      0,
      'newest',
    );

    console.log(result);
  });
});
