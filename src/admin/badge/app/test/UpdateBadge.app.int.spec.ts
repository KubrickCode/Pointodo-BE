import { Test, TestingModule } from '@nestjs/testing';
import { BadgeAdminService } from '../Badge.admin.service';
import { badgeAdminServiceTestModuleOptions } from './BadgeAdminService.test.option';
import {
  ReqAdminCreateBadgeAppDto,
  ResAdminCreateBadgeAppDto,
} from '@admin/badge/domain/dto/CreateBadge.admin.app.dto';
import { BadgeAdminErrorMessage } from '@shared/messages/admin/Badge.admin.errors';
import { mockBadge } from '@shared/test/BadgeMockData';
import { ReqAdminUpdateBadgeAppDto } from '@admin/badge/domain/dto/UpdateBadge.admin.app.dto';

describe('updateBadge', () => {
  let badgeAdminService: BadgeAdminService;
  let module: TestingModule;
  let id: number;

  beforeAll(async () => {
    module = await Test.createTestingModule(
      badgeAdminServiceTestModuleOptions,
    ).compile();

    badgeAdminService = module.get<BadgeAdminService>(BadgeAdminService);

    await module.init();
  }, 30000);

  afterAll(async () => {
    await module.close();
  });

  it('뱃지 업데이트 성공', async () => {
    const badge = { ...mockBadge };
    delete badge.id;
    const requestCreate: ReqAdminCreateBadgeAppDto = badge;

    const createdBadge: ResAdminCreateBadgeAppDto =
      await badgeAdminService.createBadge(requestCreate);

    expect(createdBadge).toBeInstanceOf(ResAdminCreateBadgeAppDto);

    const request: ReqAdminUpdateBadgeAppDto = {
      id: createdBadge.id,
      name: mockBadge.name + '1',
      description: mockBadge.description + '1',
      iconLink: mockBadge.iconLink + '1',
      price: mockBadge.price + 1,
    };

    const result = await badgeAdminService.updateBadge(request);
    expect(result).toEqual(undefined);

    id = createdBadge.id;
  }, 30000);

  it('뱃지 업데이트 실패 - 중복 이름', async () => {
    try {
      await badgeAdminService.updateBadge({ id, name: '기본 뱃지' });
    } catch (error) {
      expect(error.response.statusCode).toEqual(409);
      expect(error.response.message).toEqual(
        BadgeAdminErrorMessage.CONFLICT_BADGE_NAME,
      );
      expect(error.response.error).toEqual('Conflict');
      await badgeAdminService.deleteBadge({ id });
    }
  }, 30000);
});
