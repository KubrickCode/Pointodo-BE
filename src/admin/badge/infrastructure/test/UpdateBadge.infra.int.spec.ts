import { PrismaService } from '@shared/service/Prisma.service';
import { BadgeAdminRepository } from '../prisma/Badge.admin.repository';
import { BadgeEntity } from '@admin/badge/domain/entities/Badge.entity';
import { mockBadge } from '@shared/test/BadgeMockData';

describe('updateBadge', () => {
  let prisma: PrismaService;
  let badgeAdminRepository: BadgeAdminRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    badgeAdminRepository = new BadgeAdminRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('뱃지 업데이트 성공(생성 이후)', async () => {
    const newBadge = await badgeAdminRepository.createBadge(
      mockBadge.name,
      mockBadge.description,
      mockBadge.iconLink,
      mockBadge.type,
      mockBadge.price,
    );

    expect(newBadge.name).toEqual(mockBadge.name);
    expect(newBadge.description).toEqual(mockBadge.description);
    expect(newBadge.iconLink).toEqual(mockBadge.iconLink);
    expect(newBadge.type).toEqual(mockBadge.type);
    expect(newBadge.price).toEqual(mockBadge.price);
    expect(newBadge).toBeInstanceOf(BadgeEntity);

    const result = await badgeAdminRepository.updateBadge(
      newBadge.id,
      newBadge.name + '1',
      newBadge.description + '1',
      newBadge.iconLink + '1',
      newBadge.price + 1,
    );

    expect(result.id).toEqual(newBadge.id);
    expect(result.name).toEqual(newBadge.name + '1');
    expect(result.description).toEqual(newBadge.description + '1');
    expect(result.iconLink).toEqual(newBadge.iconLink + '1');
    expect(result.type).toEqual(newBadge.type);
    expect(result.price).toEqual(newBadge.price + 1);
    expect(result).toBeInstanceOf(BadgeEntity);

    await badgeAdminRepository.deleteBadge(result.id);
  }, 30000);
});
