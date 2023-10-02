import { TEST1_USER_LOCAL } from '@shared/test/UserMockData';
import { IPointService } from '@point/domain/interfaces/Point.service.interface';
import { mockPointService } from './PointService.mock';
import {
  ReqGetCurrentPointsAppDto,
  ResGetCurrentPointsAppDto,
} from '@point/domain/dto/GetCurrentPoints.app.dto';

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
