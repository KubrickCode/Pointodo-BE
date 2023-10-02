import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';
import { IPointRepository } from '@point/domain/interfaces/Point.repository.interface';
import { mockPointRepository } from './PointRepository.mock';
import { SpentPointsLogEntity } from '@point/domain/entities/PointsLog.entity';
import { mockBadge } from '@shared/test/BadgeMockData';

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
