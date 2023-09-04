import { PrismaService } from '@shared/service/prisma.service';
import { PointRepository } from '../prisma/point.repository';
import { HandleDateTime } from '@shared/utils/handleDateTime';

describe('getTopUserOfMonth', () => {
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

  it('이달의 유저 반환', async () => {
    const result = await pointRepository.getTopUserOnDate(
      '2023-08-01',
      '2023-09-01',
    );

    console.log(result);
  }, 30000);
});
