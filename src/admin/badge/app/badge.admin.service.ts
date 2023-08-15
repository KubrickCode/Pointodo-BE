import {
  ReqCreateBadgeAppDto,
  ResCreateBadgeAppDto,
} from '@admin/badge/domain/dto/createBadge.app.dto';
import {
  ReqDeleteBadgeAppDto,
  ResDeleteBadgeAppDto,
} from '@admin/badge/domain/dto/deleteBadge.app.dto';
import {
  ReqUpdateBadgeAppDto,
  ResUpdateBadgeAppDto,
} from '@admin/badge/domain/dto/updateBadge.app.dto';
import { BadgeEntity } from '../domain/entities/badge.entity';
import { IBadgeAdminRepository } from '@admin/badge/domain/interfaces/badge.admin.repository.interface';
import { IBadgeAdminService } from '@admin/badge/domain/interfaces/badge.admin.service.interface';
import { Inject, Injectable, ConflictException, Logger } from '@nestjs/common';
import { CONFLICT_BADGE_NAME } from '@shared/messages/admin/badge.admin.errors';
import {
  CREATE_BADGE_SUCCESS_MESSAGE,
  DELETE_BADGE_SUCCESS_MESSAGE,
  UPDATE_BADGE_SUCCESS_MESSAGE,
} from '@shared/messages/admin/badge.admin.messages';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ReqGetBadgeListAppDto } from '../domain/dto/getBadgeList.app.dto';
import { ICacheService } from '@cache/domain/interfaces/cache.service.interface';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import { IRedisService } from '@redis/domain/interfaces/redis.service.interface';

@Injectable()
export class BadgeAdminService implements IBadgeAdminService {
  constructor(
    @Inject('IBadgeAdminRepository')
    private readonly badgeAdminRepository: IBadgeAdminRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IRedisService')
    private readonly redisService: IRedisService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject('ICacheService')
    private readonly cacheService: ICacheService,
  ) {}

  async getBadgeList(req: ReqGetBadgeListAppDto): Promise<BadgeEntity[]> {
    return await this.badgeAdminRepository.getBadgeList(req.type);
  }

  async createBadge(req: ReqCreateBadgeAppDto): Promise<ResCreateBadgeAppDto> {
    const { name, description, iconLink, type, price } = req;
    const isExist = await this.badgeAdminRepository.isExist(name);
    if (isExist) throw new ConflictException(CONFLICT_BADGE_NAME);
    const createdBadge = await this.badgeAdminRepository.create(
      name,
      description,
      iconLink,
      type,
      price,
    );
    await this.cacheService.deleteCache(`allBadges`);
    this.logger.log(
      'info',
      `생성 뱃지 ID:${createdBadge.id}, 뱃지명:${createdBadge.name}`,
    );
    return { message: CREATE_BADGE_SUCCESS_MESSAGE };
  }

  async updateBadge(req: ReqUpdateBadgeAppDto): Promise<ResUpdateBadgeAppDto> {
    const { id, name, description, iconLink, price } = req;
    const isExist = await this.badgeAdminRepository.isExist(name);
    if (isExist) throw new ConflictException(CONFLICT_BADGE_NAME);
    const updatedBadge = await this.badgeAdminRepository.update(
      id,
      name,
      description,
      iconLink,
      price,
    );
    await this.cacheService.deleteCache(`allBadges`);
    await this.redisService.deleteKeysByPrefix(`userBadgeListWithName:*`);
    this.logger.log(
      'info',
      `업데이트 뱃지 타입 ID:${updatedBadge.id}, 뱃지명:${updatedBadge.name}`,
    );
    return { message: UPDATE_BADGE_SUCCESS_MESSAGE };
  }

  async deleteBadge(req: ReqDeleteBadgeAppDto): Promise<ResDeleteBadgeAppDto> {
    await this.userRepository.changeSelectedBadgetoDefault(req.id);
    const deletedBadge = await this.badgeAdminRepository.delete(req.id);

    await this.cacheService.deleteCache(`allBadges`);
    await this.redisService.deleteKeysByPrefix(`user:*`);
    await this.redisService.deleteKeysByPrefix(`userBadgeList:*`);
    await this.redisService.deleteKeysByPrefix(`userBadgeProgress:*`);
    await this.redisService.deleteKeysByPrefix(`userSpentPointsLogs:*`);
    await this.redisService.deleteKeysByPrefix(`userCurrentPoints:*`);
    await this.redisService.deleteKeysByPrefix(`userBadgeListWithName:*`);
    await this.redisService.deleteKeysByPrefix(`SPENTtotalPointPages:*`);

    this.logger.log('info', `삭제 뱃지 타입 ID:${deletedBadge.id}`);
    return { message: DELETE_BADGE_SUCCESS_MESSAGE };
  }

  async uploadFile(file: Express.MulterS3.File): Promise<{ filePath: string }> {
    return { filePath: file.location };
  }
}
