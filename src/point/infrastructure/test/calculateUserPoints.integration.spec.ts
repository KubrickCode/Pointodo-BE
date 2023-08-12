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

  it('보유 포인트 계산', async () => {
    const userId = '53500594-859e-47c1-aa71-255a378a6d67';
    const points = await pointRepository.calculateUserPoints(userId);

    console.log(points);
  });
});
