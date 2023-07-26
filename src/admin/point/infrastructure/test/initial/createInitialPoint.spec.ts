import { PrismaService } from '@shared/services/prisma.service';
import { PointAdminRepository } from '../../prisma/point.admin.repository';
import { initialPointTransactionTypes } from './initialPointTransactionTypes';

describe('createInitialPointTransactionTypes', () => {
  let prisma: PrismaService;
  let pointAdminRepository: PointAdminRepository;

  beforeAll(async () => {
    prisma = new PrismaService();
    pointAdminRepository = new PointAdminRepository(prisma);
    await prisma.user.deleteMany();
    await prisma.pointTransactionTypes.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('초기 뱃지 타입 생성 In DB', async () => {
    initialPointTransactionTypes.forEach((item) => {
      pointAdminRepository.create(item);
    });
  });
});
