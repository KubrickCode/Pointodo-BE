import { PrismaService } from '@shared/service/prisma.service';
import { PointRepository } from '../prisma/point.repository';
import { HandleDateTime } from '@shared/utils/handleDateTime';

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

  it('보유 포인트 계산', async () => {
    // const userId = '0030cc64-b54f-4e75-95a5-1379b6928f7e';
    // const points = await pointRepository.calculateUserPoints(userId);
    // console.log(points);
  });
});
