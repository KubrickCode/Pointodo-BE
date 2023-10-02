import { PrismaService } from '@shared/service/Prisma.service';
import { BadgeAdminRepository } from '../prisma/Badge.admin.repository';

describe('getBadgePrice', () => {
  let prisma: PrismaService;
  let badgeAdminRepository: BadgeAdminRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    badgeAdminRepository = new BadgeAdminRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('뱃지 가격 불러오기 성공', async () => {
    const result = await badgeAdminRepository.getBadgePrice(2);

    expect(typeof result).toEqual('number');
  }, 30000);
});
