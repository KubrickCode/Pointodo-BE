import { PrismaService } from '@shared/service/prisma.service';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { UUID } from 'crypto';
import { UserBadgeRepository } from '../prisma/userBadge.repository';
import { UserBadgeEntity } from '@badge/domain/entities/userBadge.entity';

describe('getUserBadgeList', () => {
  let prisma: PrismaService;
  let userBadgeRepository: UserBadgeRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    userBadgeRepository = new UserBadgeRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('유저 뱃지 리스트 반환 성공', async () => {
    const userId: UUID = TEST1_USER_LOCAL.id;

    const result = await userBadgeRepository.getUserBadgeList(userId);

    expect(result).toBeInstanceOf(Array<Pick<UserBadgeEntity, 'badgeId'>>);
    expect(result[0]).toEqual({ badgeId: 1 });
  }, 30000);
});
