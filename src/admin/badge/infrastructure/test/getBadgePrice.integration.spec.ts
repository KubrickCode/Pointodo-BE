import { PrismaService } from '@shared/service/prisma.service';
import { BadgeAdminRepository } from '../prisma/badge.admin.repository';

describe('getBadgePrice', () => {
  let prisma: PrismaService;
  let badgeAdminRepository: BadgeAdminRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    badgeAdminRepository = new BadgeAdminRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('뱃지 가격 불러오기', async () => {
    const badgeType = '일관성 뱃지2';
    const badgePrice = await badgeAdminRepository.getBadgePrice(badgeType);

    console.log(badgePrice);
  });
});
