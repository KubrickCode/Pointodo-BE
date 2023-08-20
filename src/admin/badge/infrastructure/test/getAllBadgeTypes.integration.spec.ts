import { PrismaService } from '@shared/service/prisma.service';
import { BadgeAdminRepository } from '../prisma/badge.admin.repository';

describe('getAllBadgeTypes', () => {
  let prisma: PrismaService;
  let badgeAdminRepository: BadgeAdminRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    badgeAdminRepository = new BadgeAdminRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('뱃지 타입 모두 불러오기', async () => {
    // const allbadgeTypes = await badgeAdminRepository.getAllBadgeTypes();
    // console.log(allbadgeTypes);
  });
});
