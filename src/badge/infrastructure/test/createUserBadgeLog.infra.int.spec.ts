import { PrismaService } from '@shared/service/prisma.service';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { UUID } from 'crypto';
import { UserBadgeRepository } from '../prisma/userBadge.repository';
import { UserBadgeLogEntity } from '@badge/domain/entities/userBadgeLog.entity';

describe('createUserBadgeLog', () => {
  let prisma: PrismaService;
  let userBadgeRepository: UserBadgeRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    userBadgeRepository = new UserBadgeRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('유저 뱃지 로그 생성 성공', async () => {
    const userId: UUID = TEST1_USER_LOCAL.id;
    const badgeId = 2;

    const result = await userBadgeRepository.createUserBadgeLog(
      userId,
      badgeId,
    );

    expect(result).toBeInstanceOf(UserBadgeLogEntity);
    expect(result.userId).toEqual(userId);
    expect(result.badgeId).toEqual(badgeId);

    await userBadgeRepository.deleteUserBadgeLog(result.id);
  }, 30000);
});
