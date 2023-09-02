import { Test, TestingModule } from '@nestjs/testing';
import { BadgeAdminService } from '../badge.admin.service';
import { badgeAdminServiceTestModuleOptions } from './badgeAdminService.test.option';
import { BadgeType_ } from '@admin/badge/domain/entities/badge.entity';
import {
  ReqAdminCreateBadgeAppDto,
  ResAdminCreateBadgeAppDto,
} from '@admin/badge/domain/dto/createBadge.admin.app.dto';
import { CONFLICT_BADGE_NAME } from '@shared/messages/admin/badge.admin.errors';
import { mockBadge } from '@shared/test/badgeMockData';

describe('createBadge', () => {
  let badgeAdminService: BadgeAdminService;
  let module: TestingModule;

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

  it('뱃지 생성 성공 - NORMAL,ACHIEVEMENT', async () => {
    const request: ReqAdminCreateBadgeAppDto = mockBadge;

    const result: ResAdminCreateBadgeAppDto =
      await badgeAdminService.createBadge(request);

    expect(result).toBeInstanceOf(ResAdminCreateBadgeAppDto);

    await badgeAdminService.deleteBadge({ id: result.id });
  }, 30000);

  it('뱃지 생성 성공 - SPECIAL', async () => {
    const requestBadge = { ...mockBadge, type: 'SPECIAL' as BadgeType_ };
    delete requestBadge.price;

    const request: ReqAdminCreateBadgeAppDto = requestBadge;

    const result: ResAdminCreateBadgeAppDto =
      await badgeAdminService.createBadge(request);

    expect(result).toBeInstanceOf(ResAdminCreateBadgeAppDto);

    await badgeAdminService.deleteBadge({ id: result.id });
  }, 30000);

  it('뱃지 생성 실패 - 중복 이름', async () => {
    try {
      const request: ReqAdminCreateBadgeAppDto = {
        ...mockBadge,
        name: '기본 뱃지',
      };

      await badgeAdminService.createBadge(request);
    } catch (error) {
      expect(error.response.statusCode).toEqual(409);
      expect(error.response.message).toEqual(CONFLICT_BADGE_NAME);
      expect(error.response.error).toEqual('Conflict');
    }
  }, 30000);
});
