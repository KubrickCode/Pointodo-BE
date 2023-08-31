import { PrismaService } from '@shared/service/prisma.service';
import { BadgeAdminRepository } from '../prisma/badge.admin.repository';
import {
  BadgeEntity,
  BadgeType_,
} from '@admin/badge/domain/entities/badge.entity';

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
    const badgeTypes: BadgeType_[] = ['NORMAL', 'ACHIEVEMENT'];
    const randomIndex = Math.floor(Math.random() * badgeTypes.length);

    const name = 'test';
    const description = 'test';
    const iconLink = 'test';
    const type: BadgeType_ = badgeTypes[randomIndex];
    const price = 100;

    const result = await badgeAdminRepository.createBadge(
      name,
      description,
      iconLink,
      type,
      price,
    );

    await badgeAdminRepository.deleteBadge(result.id);

    expect(result.name).toEqual(name);
    expect(result.description).toEqual(description);
    expect(result.iconLink).toEqual(iconLink);
    expect(result.type).toEqual(type);
    expect(result.price).toEqual(price);
    expect(result).toBeInstanceOf(BadgeEntity);
  }, 30000);

  it('뱃지 생성 성공 - SPECIAL', async () => {
    const name = 'test';
    const description = 'test';
    const iconLink = 'test';
    const type: BadgeType_ = 'SPECIAL';

    const result = await badgeAdminRepository.createBadge(
      name,
      description,
      iconLink,
      type,
    );

    await badgeAdminRepository.deleteBadge(result.id);

    expect(result.name).toEqual(name);
    expect(result.description).toEqual(description);
    expect(result.iconLink).toEqual(iconLink);
    expect(result.type).toEqual(type);
    expect(result).toBeInstanceOf(BadgeEntity);
  }, 30000);
});
