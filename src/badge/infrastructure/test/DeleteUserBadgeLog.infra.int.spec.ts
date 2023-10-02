import { PrismaService } from '@shared/service/Prisma.service';
import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';
import { UUID } from 'crypto';
import { UserBadgeRepository } from '../prisma/UserBadge.repository';

describe('deleteUserBadgeLog', () => {
  let prisma: PrismaService;
  let userBadgeRepository: UserBadgeRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    userBadgeRepository = new UserBadgeRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('유저 뱃지 로그 삭제 성공', async () => {
    const userId: UUID = TEST1_USER_LOCAL.id;
    const badgeId = 2;

    const badgeLog = await userBadgeRepository.createUserBadgeLog(
      userId,
      badgeId,
    );

    const result = await userBadgeRepository.deleteUserBadgeLog(badgeLog.id);
    expect(result.userId).toEqual(userId);
    expect(result.badgeId).toEqual(badgeId);
  }, 30000);
});
