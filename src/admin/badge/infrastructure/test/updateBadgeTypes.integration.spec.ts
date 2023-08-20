import { PrismaService } from '@shared/service/prisma.service';
import { BadgeAdminRepository } from '../prisma/badge.admin.repository';

describe('updateBadgeType', () => {
  let prisma: PrismaService;
  let badgeAdminRepository: BadgeAdminRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    badgeAdminRepository = new BadgeAdminRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('뱃지 타입 업데이트 In DB', async () => {
    // const badgeType = {
    //   id: 1,
    //   name: '321',
    //   iconLink: '431',
    // };
    // const updatedBadgeType = await badgeAdminRepository.update(badgeType);
    // const retrievedBadgeType = await prisma.badgeTypes.findUnique({
    //   where: { id: updatedBadgeType.id },
    // });
    // expect(retrievedBadgeType).toMatchObject({
    //   id: updatedBadgeType.id,
    //   name: updatedBadgeType.name,
    //   description: updatedBadgeType.description,
    //   iconLink: updatedBadgeType.iconLink,
    // });
    // // await prisma.badgeTypes.delete({ where: { id: updatedBadgeType.id } });
  });
});
