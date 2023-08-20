import { PrismaService } from '@shared/service/prisma.service';
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
    // const name = '123';
    // const description = '123';
    // const iconLink = '123';
    // const type = 'SPECIAL';
    // const createdBadgeType = await badgeAdminRepository.create(
    //   name,
    //   description,
    //   iconLink,
    //   type,
    // );
    // const retrievedBadgeType = await prisma.badge.findUnique({
    //   where: { name },
    // });
    // expect(retrievedBadgeType).toMatchObject({
    //   id: createdBadgeType.id,
    //   name: createdBadgeType.name,
    //   description: createdBadgeType.description,
    //   iconLink: createdBadgeType.iconLink,
    // });
    // await prisma.badge.delete({ where: { id: createdBadgeType.id } });
  });
});
