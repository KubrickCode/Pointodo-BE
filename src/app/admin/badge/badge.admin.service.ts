import {
  ReqCreateBadgeTypeAppDto,
  ResCreateBadgeTypeAppDto,
} from '@domain/admin/badge/dto/createBadgeType.app.dto';
import { ResDeleteBadgeTypeAppDto } from '@domain/admin/badge/dto/deleteBadgeType.app.dto';
import {
  ReqUpdateBadgeTypeAppDto,
  ResUpdateBadgeTypeAppDto,
} from '@domain/admin/badge/dto/updateBadgeType.app.dto';
import { BadgeTypesEntity } from '@domain/admin/badge/entities/badgeTypes.entity';
import { IBadgeAdminRepository } from '@domain/admin/badge/interfaces/badge.admin.repository.interface';
import { IBadgeAdminService } from '@domain/admin/badge/interfaces/badge.admin.service.interface';
import { Inject, Injectable, ConflictException, Logger } from '@nestjs/common';
import {
  CREATE_BADGE_TYPE_SUCCESS_MESSAGE,
  DELETE_BADGE_TYPE_SUCCESS_MESSAGE,
  UPDATE_BADGE_TYPE_SUCCESS_MESSAGE,
} from '@shared/messages/admin/badge.admin.messages';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class BadgeAdminService implements IBadgeAdminService {
  constructor(
    @Inject('IBadgeAdminRepository')
    private readonly badgeAdminRepository: IBadgeAdminRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async getAllBadgeTypes(): Promise<BadgeTypesEntity[]> {
    return await this.badgeAdminRepository.getAllBadgeTypes();
  }

  async createBadgeType(
    req: ReqCreateBadgeTypeAppDto,
  ): Promise<ResCreateBadgeTypeAppDto> {
    const { id, name } = req;
    const isExist = await this.badgeAdminRepository.isExist({ id, name });
    if (isExist) throw new ConflictException('이미 존재하는 ID 혹은 뱃지 이름');
    const createdBadgeType = await this.badgeAdminRepository.create(req);
    this.logger.log(
      'info',
      `생성 뱃지 타입 ID:${createdBadgeType.id}, 뱃지명:${createdBadgeType.name}, 설명:${createdBadgeType.description}, 아이콘 링크:${createdBadgeType.iconLink}`,
    );
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
    const updatedBadgeType = await this.badgeAdminRepository.update(req);
    this.logger.log(
      'info',
      `업데이트 뱃지 타입 ID:${updatedBadgeType.id}, 뱃지명:${updatedBadgeType.name}, 설명:${updatedBadgeType.description}, 아이콘 링크:${updatedBadgeType.iconLink}`,
    );
    return { message: UPDATE_BADGE_TYPE_SUCCESS_MESSAGE };
  }

  async deleteBadgeType(id: number): Promise<ResDeleteBadgeTypeAppDto> {
    const deletedBadgeType = await this.badgeAdminRepository.delete(id);
    this.logger.log('info', `삭제 뱃지 타입 ID:${deletedBadgeType.id}`);
    return { message: DELETE_BADGE_TYPE_SUCCESS_MESSAGE };
  }
}
