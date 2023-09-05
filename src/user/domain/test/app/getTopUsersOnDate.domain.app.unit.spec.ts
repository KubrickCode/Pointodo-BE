import { IUserService } from '@user/domain/interfaces/user.service.interface';
import { mockUserService } from './userService.mock';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import {
  ReqGetTopUsersOnDateAppDto,
  ResGetTopUsersOnDateAppDto,
} from '@user/domain/dto/getTopUsersOnDate.app.dto';

describe('getTopUsersOnDate', () => {
  const userService: IUserService = mockUserService;

  it('이달의 유저 찾기 성공', async () => {
    const req: ReqGetTopUsersOnDateAppDto = {
      startDate: '2023-08-01',
      endDate: '2023-09-01',
    };

    const res: ResGetTopUsersOnDateAppDto[] = [
      {
        userId: TEST1_USER_LOCAL.id,
        email: TEST1_USER_LOCAL.email,
        points: 0,
      },
    ];

    jest.spyOn(userService, 'getTopUsersOnDate').mockResolvedValue(res);

    const result = await userService.getTopUsersOnDate(req);

    expect(result).toEqual(res);
    expect(userService.getTopUsersOnDate).toHaveBeenCalledWith(req);
  });
});
