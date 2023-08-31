import { IUserService } from '@user/domain/interfaces/user.service.interface';
import { mockUserService } from './userService.mock';
import {
  ReqGetUserAppDto,
  ResGetUserAppDto,
} from '@user/domain/dto/getUser.app.dto';
import { MOCK_USER } from '@shared/test/userMockData';

describe('getUser', () => {
  const userService: IUserService = mockUserService;

  it('유저 정보 조회 성공', async () => {
    const req: ReqGetUserAppDto = {
      id: MOCK_USER.id,
    };

    const res: ResGetUserAppDto = {
      ...MOCK_USER,
      selectedBadge: { iconLink: 'link' },
    };

    jest.spyOn(userService, 'getUser').mockResolvedValue(res);

    const result = await userService.getUser(req);

    expect(result).toEqual(res);
    expect(userService.getUser).toHaveBeenCalledWith(req);
  });
});
