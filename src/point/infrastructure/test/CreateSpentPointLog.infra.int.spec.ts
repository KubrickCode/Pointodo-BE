import { PrismaService } from '@shared/service/Prisma.service';
import { PointRepository } from '../prisma/Point.repository';
import { HandleDateTime } from '@shared/utils/HandleDateTime';
import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/UserBadge.repository';
import { UUID } from 'crypto';

describe('createSpentPointLog', () => {
  let prisma: PrismaService;
  let pointRepository: PointRepository;
  let handleDateTime: HandleDateTime;
  let userBadgeRepository: UserBadgeRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    pointRepository = new PointRepository(prisma, handleDateTime);
    userBadgeRepository = new UserBadgeRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('소모 포인트 로그 생성 성공', async () => {
    const userId: UUID = TEST1_USER_LOCAL.id;
    const badgeId = 2;
    const points = 1000;

    const badgeLog = await userBadgeRepository.createUserBadgeLog(
      userId,
      badgeId,
    );

    const result = await pointRepository.createSpentPointLog(
      badgeLog.id,
      userId,
      points,
    );

    expect(result.badgeLogId).toEqual(badgeLog.id);
    expect(result.userId).toEqual(userId);
    expect(result.points).toEqual(points);

    await userBadgeRepository.deleteUserBadgeLog(badgeLog.id);
  }, 30000);
});
