import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import { mockPointRepository } from './pointRepository.mock';

describe('calculateUserPoints', () => {
  const pointRepository: IPointRepository = mockPointRepository;

  it('유저 포인트 계산 성공', async () => {
    const userId = TEST1_USER_LOCAL.id;

    const points = 0;

    jest
      .spyOn(pointRepository, 'calculateUserPoints')
      .mockResolvedValue(points);

    const result = await pointRepository.calculateUserPoints(userId);

    expect(result).toEqual(points);
    expect(pointRepository.calculateUserPoints).toHaveBeenCalledWith(userId);
  });
});
