import { PrismaService } from '@shared/service/prisma.service';
import { BadgeAdminRepository } from '../../prisma/badge.admin.repository';
import { initialBadgeTypes } from './initialBadgeTypes';

describe('createInitialBadgeTypes', () => {
  let prisma: PrismaService;
  let badgeAdminRepository: BadgeAdminRepository;

  beforeAll(async () => {
    prisma = new PrismaService();
    badgeAdminRepository = new BadgeAdminRepository(prisma);
    await prisma.user.deleteMany();
    await prisma.badgeTypes.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('초기 뱃지 타입 생성 In DB', async () => {
    for (const item of initialBadgeTypes) {
      await badgeAdminRepository.create(
        item.name,
        item.description,
        item.iconLink,
      );
    }
  });
});
