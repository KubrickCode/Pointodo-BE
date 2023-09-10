import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import { mockPointRepository } from './pointRepository.mock';
import { SpentPointsLogEntity } from '@point/domain/entities/pointsLog.entity';
import { mockBadge } from '@shared/test/badgeMockData';

describe('createSpentPointLog', () => {
  const pointRepository: IPointRepository = mockPointRepository;

  it('소모 포인트 로그 생성 성공', async () => {
    const badgeLogId = 1;
    const userId = TEST1_USER_LOCAL.id;
    const points = mockBadge.price;

    const expectedResult: SpentPointsLogEntity = {
      id: 1,
      badgeLogId,
      userId,
      points,
      occurredAt: new Date(),
    };

    jest
      .spyOn(pointRepository, 'createSpentPointLog')
      .mockResolvedValue(expectedResult);

    const result = await pointRepository.createSpentPointLog(
      badgeLogId,
      userId,
      points,
    );

    expect(result).toEqual(expectedResult);
    expect(pointRepository.createSpentPointLog).toHaveBeenCalledWith(
      badgeLogId,
      userId,
      points,
    );
  });
});
