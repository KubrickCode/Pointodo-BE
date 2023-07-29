import { PrismaService } from '@shared/service/prisma.service';
import { BadgeAdminRepository } from '../prisma/badge.admin.repository';

describe('deleteBadgeType', () => {
  let prisma: PrismaService;
  let badgeAdminRepository: BadgeAdminRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    badgeAdminRepository = new BadgeAdminRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('뱃지 타입 삭제 In DB', async () => {
    const badgeId = 1;

    const retrievedBadgeType = await prisma.badgeTypes.findUnique({
      where: { id: badgeId },
    });

    const deletedBadgeType = await badgeAdminRepository.delete(badgeId);

    expect(retrievedBadgeType).toMatchObject({
      id: deletedBadgeType.id,
      name: deletedBadgeType.name,
      description: deletedBadgeType.description,
      iconLink: deletedBadgeType.iconLink,
    });
  });
});
