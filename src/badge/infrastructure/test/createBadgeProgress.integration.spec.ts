import { PrismaService } from '@shared/service/prisma.service';
import { BadgeProgressRepository } from '../prisma/badgeProgress.repository';

describe('createBadgeProgress', () => {
  let prisma: PrismaService;
  let badgeProgressRepository: BadgeProgressRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    badgeProgressRepository = new BadgeProgressRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('뱃지 작업 진척도 생성 In DB', async () => {
    const req = {
      userId: '90504282-ad4c-4039-a174-ca5b34e98d51',
      badgeId: 1,
    };

    const createdBadgeProgress =
      await badgeProgressRepository.createBadgeProgress(req);

    const retrievedBadgeProgress = await prisma.badgeProgress.findUnique({
      where: { id: createdBadgeProgress.id },
    });

    expect(retrievedBadgeProgress).toMatchObject({
      id: createdBadgeProgress.id,
    });

    // await prisma.badgeProgress.delete({
    //   where: { id: createdBadgeProgress.id },
    // });
  });
});
