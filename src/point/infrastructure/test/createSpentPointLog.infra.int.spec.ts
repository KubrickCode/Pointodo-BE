import { PrismaService } from '@shared/service/prisma.service';
import { PointRepository } from '../prisma/point.repository';
import { HandleDateTime } from '@shared/utils/handleDateTime';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { UserBadgeRepository } from '@badge/infrastructure/prisma/userBadge.repository';
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
