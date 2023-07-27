import { PrismaService } from '@shared/services/prisma.service';
import { BadgeAdminRepository } from '../prisma/badge.admin.repository';

describe('createBadgeType', () => {
  let prisma: PrismaService;
  let badgeAdminRepository: BadgeAdminRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    badgeAdminRepository = new BadgeAdminRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('뱃지 타입 생성 In DB', async () => {
    const badgeType = {
      id: 0,
      name: '123',
      description: '123',
      iconLink: '123',
    };

    const createdBadgeType = await badgeAdminRepository.create(badgeType);

    const retrievedBadgeType = await prisma.badgeTypes.findUnique({
      where: { id: createdBadgeType.id },
    });

    expect(retrievedBadgeType).toMatchObject({
      id: createdBadgeType.id,
      name: createdBadgeType.name,
      description: createdBadgeType.description,
      iconLink: createdBadgeType.iconLink,
    });

    // await prisma.badgeTypes.delete({ where: { id: createdBadgeType.id } });
  });
});
