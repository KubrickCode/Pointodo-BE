import {
  ReqCreateBadgeTypeAppDto,
  ResCreateBadgeTypeAppDto,
} from '@admin/badge/domain/dto/createBadgeType.app.dto';
import { ResDeleteBadgeTypeAppDto } from '@admin/badge/domain/dto/deleteBadgeType.app.dto';
import {
  ReqUpdateBadgeTypeAppDto,
  ResUpdateBadgeTypeAppDto,
} from '@admin/badge/domain/dto/updateBadgeType.app.dto';
import { BadgeTypesEntity } from '@admin/badge/domain/entities/badgeTypes.entity';
import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import { IBadgeAdminService } from '@admin/badge/domain/interfaces/badge.admin.service.interface';
import { Inject, Injectable, ConflictException, Logger } from '@nestjs/common';
import { CONFLICT_BADGE_NAME } from '@shared/messages/admin/badge.admin.errors';
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
    const { name, description, iconLink } = req;
    const isExist = await this.badgeAdminRepository.isExist(name);
    if (isExist) throw new ConflictException(CONFLICT_BADGE_NAME);
    const createdBadgeType = await this.badgeAdminRepository.create(
      name,
      description,
      iconLink,
    );
    this.logger.log(
      'info',
      `생성 뱃지 타입 ID:${createdBadgeType.id}, 뱃지명:${createdBadgeType.name}, 설명:${createdBadgeType.description}, 아이콘 링크:${createdBadgeType.iconLink}`,
    );
    return { message: CREATE_BADGE_TYPE_SUCCESS_MESSAGE };
  }

  async updateBadgeType(
    req: ReqUpdateBadgeTypeAppDto,
  ): Promise<ResUpdateBadgeTypeAppDto> {
    const { id, name, description, iconLink } = req;
    const isExist = await this.badgeAdminRepository.isExist(name);
    if (isExist) throw new ConflictException(CONFLICT_BADGE_NAME);
    const updatedBadgeType = await this.badgeAdminRepository.update(
      id,
      name,
      description,
      iconLink,
    );
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
