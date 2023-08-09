import { PrismaService } from '@shared/service/prisma.service';
import { BadgeAdminRepository } from '../prisma/badge.admin.repository';

describe('getBadgeIdByName', () => {
  let prisma: PrismaService;
  let badgeAdminRepository: BadgeAdminRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    badgeAdminRepository = new BadgeAdminRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('뱃지 ID 찾기 In DB', async () => {
    const name = '일관성 뱃지3';

    const badgeId = await badgeAdminRepository.getBadgeIdByName(name);

    console.log(badgeId);
  });
});
