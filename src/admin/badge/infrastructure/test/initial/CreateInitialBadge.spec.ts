import { PrismaService } from '@shared/service/Prisma.service';
import { BadgeAdminRepository } from '../../prisma/Badge.admin.repository';
import { initialBadgeTypes } from './InitialBadgeTypes';
import { BadgeType_ } from '@admin/badge/domain/entities/Badge.entity';

describe('createInitialBadgeTypes', () => {
  let prisma: PrismaService;
  let badgeAdminRepository: BadgeAdminRepository;

  beforeAll(async () => {
    prisma = new PrismaService();
    badgeAdminRepository = new BadgeAdminRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('초기 뱃지 타입 생성 In DB', async () => {
    // for (const item of initialBadgeTypes) {
    //   await badgeAdminRepository.create(
    //     item.name,
    //     item.description,
    //     item.iconLink,
    //     item.type as BadgeType_,
    //     item.price,
    //   );
    // }
  });
});
