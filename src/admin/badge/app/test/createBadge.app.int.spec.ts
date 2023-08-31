import { Test, TestingModule } from '@nestjs/testing';
import { BadgeAdminService } from '../badge.admin.service';
import { badgeAdminServiceTestModuleOptions } from './badgeAdminService.test.option';
import { BadgeType_ } from '@admin/badge/domain/entities/badge.entity';
import {
  ReqAdminCreateBadgeAppDto,
  ResAdminCreateBadgeAppDto,
} from '@admin/badge/domain/dto/createBadge.admin.app.dto';
import { CREATE_BADGE_SUCCESS_MESSAGE } from '@shared/messages/admin/badge.admin.messages';
import { CONFLICT_BADGE_NAME } from '@shared/messages/admin/badge.admin.errors';

describe('createBadge', () => {
  let badgeAdminService: BadgeAdminService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule(
      badgeAdminServiceTestModuleOptions,
    ).compile();

    badgeAdminService = module.get<BadgeAdminService>(BadgeAdminService);

    await module.init();
  });

  afterAll(async () => {
    await module.close();
  });

  it('뱃지 생성 성공 - NORMAL,ACHIEVEMENT', async () => {
    const badgeTypes: BadgeType_[] = ['NORMAL', 'ACHIEVEMENT'];
    const randomIndex = Math.floor(Math.random() * badgeTypes.length);

    const name = 'test';
    const description = 'test';
    const iconLink = 'test';
    const type: BadgeType_ = badgeTypes[randomIndex];
    const price = 100;

    const request: ReqAdminCreateBadgeAppDto = {
      name,
      description,
      iconLink,
      type,
      price,
    };

    const result: ResAdminCreateBadgeAppDto =
      await badgeAdminService.createBadge(request);

    expect(result.message).toEqual(CREATE_BADGE_SUCCESS_MESSAGE);
    expect(result).toBeInstanceOf(ResAdminCreateBadgeAppDto);

    await badgeAdminService.deleteBadge({ id: result.id });
  });

  it('뱃지 생성 성공 - SPECIAL', async () => {
    const name = 'test';
    const description = 'test';
    const iconLink = 'test';
    const type: BadgeType_ = 'SPECIAL';

    const request: ReqAdminCreateBadgeAppDto = {
      name,
      description,
      iconLink,
      type,
    };

    const result: ResAdminCreateBadgeAppDto =
      await badgeAdminService.createBadge(request);

    expect(result.message).toEqual(CREATE_BADGE_SUCCESS_MESSAGE);
    expect(result).toBeInstanceOf(ResAdminCreateBadgeAppDto);

    await badgeAdminService.deleteBadge({ id: result.id });
  });

  it('뱃지 생성 실패 - 중복 이름', async () => {
    try {
      const badgeTypes: BadgeType_[] = ['NORMAL', 'ACHIEVEMENT', 'SPECIAL'];
      const randomIndex = Math.floor(Math.random() * badgeTypes.length);

      const name = '기본 뱃지';
      const description = 'test';
      const iconLink = 'test';
      const type: BadgeType_ = badgeTypes[randomIndex];
      const price = 100;

      const request: ReqAdminCreateBadgeAppDto = {
        name,
        description,
        iconLink,
        type,
        price,
      };

      await badgeAdminService.createBadge(request);
    } catch (error) {
      expect(error.response.statusCode).toEqual(409);
      expect(error.response.message).toEqual(CONFLICT_BADGE_NAME);
      expect(error.response.error).toEqual('Conflict');
    }
  });
});
