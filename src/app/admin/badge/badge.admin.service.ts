import {
  ReqCreateBadgeTypeAppDto,
  ResCreateBadgeTypeAppDto,
} from '@domain/admin/badge/dto/createBadgeType.app.dto';
import { ResDeleteBadgeTypeAppDto } from '@domain/admin/badge/dto/deleteBadgeType.app.dto';
import {
  ReqUpdateBadgeTypeAppDto,
  ResUpdateBadgeTypeAppDto,
} from '@domain/admin/badge/dto/updateBadgeType.app.dto';
import { IBadgeAdminRepository } from '@domain/admin/badge/interfaces/badge.admin.repository.interface';
import { IBadgeAdminService } from '@domain/admin/badge/interfaces/badge.admin.service.interface';
import { Inject, Injectable, ConflictException } from '@nestjs/common';
import {
  CREATE_BADGE_TYPE_SUCCESS_MESSAGE,
  DELETE_BADGE_TYPE_SUCCESS_MESSAGE,
  UPDATE_BADGE_TYPE_SUCCESS_MESSAGE,
} from '@shared/messages/admin/badge.admin.messages';

@Injectable()
export class BadgeAdminService implements IBadgeAdminService {
  constructor(
    @Inject('IBadgeAdminRepository')
    private readonly badgeAdminRepository: IBadgeAdminRepository,
  ) {}

  async createBadgeType(
    req: ReqCreateBadgeTypeAppDto,
  ): Promise<ResCreateBadgeTypeAppDto> {
    const { id, name } = req;
    const isExist = await this.badgeAdminRepository.isExist({ id, name });
    if (isExist) throw new ConflictException('이미 존재하는 ID 혹은 뱃지 이름');
    await this.badgeAdminRepository.create(req);
    return { message: CREATE_BADGE_TYPE_SUCCESS_MESSAGE };
  }

  async updateBadgeType(
    req: ReqUpdateBadgeTypeAppDto,
  ): Promise<ResUpdateBadgeTypeAppDto> {
    const { newId, name } = req;
    const isExist = await this.badgeAdminRepository.isExist({
      id: newId,
      name,
    });
    if (isExist) throw new ConflictException('이미 존재하는 ID 혹은 뱃지 이름');
    await this.badgeAdminRepository.update(req);
    return { message: UPDATE_BADGE_TYPE_SUCCESS_MESSAGE };
  }

  async deleteBadgeType(id: number): Promise<ResDeleteBadgeTypeAppDto> {
    await this.badgeAdminRepository.delete(id);
    return { message: DELETE_BADGE_TYPE_SUCCESS_MESSAGE };
  }
}
