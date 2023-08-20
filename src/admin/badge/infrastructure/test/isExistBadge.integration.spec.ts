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
    // const badgePrice = await badgeAdminRepository.isExist('일관성 뱃지4');
    // console.log(badgePrice);
  });
});
