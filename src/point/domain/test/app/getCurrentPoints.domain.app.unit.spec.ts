import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { IPointService } from '@point/domain/interfaces/point.service.interface';
import { mockPointService } from './pointService.mock';
import {
  ReqGetCurrentPointsAppDto,
  ResGetCurrentPointsAppDto,
} from '@point/domain/dto/getCurrentPoints.app.dto';

describe('getCurrentPoints', () => {
  const pointService: IPointService = mockPointService;

  it('유저 포인트 요청 성공', async () => {
    const request: ReqGetCurrentPointsAppDto = { userId: TEST1_USER_LOCAL.id };

    const response: ResGetCurrentPointsAppDto = { points: 0 };

    jest.spyOn(pointService, 'getCurrentPoints').mockResolvedValue(response);

    const result = await pointService.getCurrentPoints(request);

    expect(result).toEqual(response);
    expect(pointService.getCurrentPoints).toHaveBeenCalledWith(request);
  });
});
