import { PrismaService } from '@shared/service/Prisma.service';
import { BadgeAdminRepository } from '../prisma/Badge.admin.repository';
import { BadgeEntity } from '@admin/badge/domain/entities/Badge.entity';
import { mockBadge } from '@shared/test/BadgeMockData';

describe('createBadge', () => {
  let prisma: PrismaService;
  let badgeAdminRepository: BadgeAdminRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    badgeAdminRepository = new BadgeAdminRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('뱃지 생성 성공 - NORMAL,ACHIEVEMENT', async () => {
    const result = await badgeAdminRepository.createBadge(
      mockBadge.name,
      mockBadge.description,
      mockBadge.iconLink,
      mockBadge.type,
      mockBadge.price,
    );

    await badgeAdminRepository.deleteBadge(result.id);

    expect(result.name).toEqual(mockBadge.name);
    expect(result.description).toEqual(mockBadge.description);
    expect(result.iconLink).toEqual(mockBadge.iconLink);
    expect(result.type).toEqual(mockBadge.type);
    expect(result.price).toEqual(mockBadge.price);
    expect(result).toBeInstanceOf(BadgeEntity);
  }, 30000);

  it('뱃지 생성 성공 - SPECIAL', async () => {
    const result = await badgeAdminRepository.createBadge(
      mockBadge.name,
      mockBadge.description,
      mockBadge.iconLink,
      mockBadge.type,
    );

    await badgeAdminRepository.deleteBadge(result.id);

    expect(result.name).toEqual(mockBadge.name);
    expect(result.description).toEqual(mockBadge.description);
    expect(result.iconLink).toEqual(mockBadge.iconLink);
    expect(result.type).toEqual(mockBadge.type);
    expect(result).toBeInstanceOf(BadgeEntity);
  }, 30000);
});
