import {
  ReqAdminCreateBadgeAppDto,
  ResAdminCreateBadgeAppDto,
} from '@admin/badge/domain/dto/createBadge.admin.app.dto';
import { ReqAdminDeleteBadgeAppDto } from '@admin/badge/domain/dto/deleteBadge.admin.app.dto';
import { ReqAdminUpdateBadgeAppDto } from '@admin/badge/domain/dto/updateBadge.admin.app.dto';
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
import { ICacheService } from '@cache/domain/interfaces/cache.service.interface';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import { IRedisService } from '@redis/domain/interfaces/redis.service.interface';
import { plainToClass } from 'class-transformer';
import {
  ReqAdminUploadFileAppDto,
  ResAdminUploadFileAppDto,
} from '../domain/dto/uploadFile.admin.app.dto';
import {
  IBADGE_ADMIN_REPOSITORY,
  ICACHE_SERVICE,
  IREDIS_SERVICE,
  IUSER_REPOSITORY,
} from '@shared/constants/provider.constant';

@Injectable()
export class BadgeAdminService implements IBadgeAdminService {
  constructor(
    @Inject(IBADGE_ADMIN_REPOSITORY)
    private readonly badgeAdminRepository: IBadgeAdminRepository,
    @Inject(IUSER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(IREDIS_SERVICE)
    private readonly redisService: IRedisService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject(ICACHE_SERVICE)
    private readonly cacheService: ICacheService,
  ) {}

  async createBadge(
    req: ReqAdminCreateBadgeAppDto,
  ): Promise<ResAdminCreateBadgeAppDto> {
    const { name, description, iconLink, type, price } = req;
    const isExist = await this.badgeAdminRepository.isExistBadge(name);
    if (isExist) throw new ConflictException(CONFLICT_BADGE_NAME);
    const createdBadge = await this.badgeAdminRepository.createBadge(
      name,
      description,
      iconLink,
      type,
      price,
    );
    await this.cacheService.deleteCache(`allBadges`);
    this.logger.log(
      'info',
      `${CREATE_BADGE_SUCCESS_MESSAGE}-뱃지 ID:${createdBadge.id}, 뱃지명:${createdBadge.name}`,
    );
    return plainToClass(ResAdminCreateBadgeAppDto, { id: createdBadge.id });
  }

  async updateBadge(req: ReqAdminUpdateBadgeAppDto): Promise<void> {
    const { id, name, description, iconLink, price } = req;
    if (name) {
      const isExist = await this.badgeAdminRepository.isExistBadge(name);
      if (isExist) throw new ConflictException(CONFLICT_BADGE_NAME);
    }

    const updatedBadge = await this.badgeAdminRepository.updateBadge(
      id,
      name,
      description,
      iconLink,
      price,
    );
    await this.cacheService.deleteCache(`allBadges`);
    this.logger.log(
      'info',
      `${UPDATE_BADGE_SUCCESS_MESSAGE}-뱃지 ID:${updatedBadge.id}, 뱃지명:${updatedBadge.name}`,
    );
  }

  async deleteBadge(req: ReqAdminDeleteBadgeAppDto): Promise<void> {
    await this.userRepository.changeSelectedBadgeToDefault(req.id);
    const deletedBadge = await this.badgeAdminRepository.deleteBadge(req.id);

    await this.cacheService.deleteCache(`allBadges`);
    await this.redisService.deleteKeysByPrefix(`user:*`);
    await this.redisService.deleteKeysByPrefix(`userBadgeList:*`);
    await this.redisService.deleteKeysByPrefix(`userSpentPointsLogs:*`);
    await this.redisService.deleteKeysByPrefix(`SPENTtotalPointPages:*`);

    this.logger.log(
      'info',
      `${DELETE_BADGE_SUCCESS_MESSAGE}-뱃지 ID:${deletedBadge.id}`,
    );
  }

  async uploadFile(
    req: ReqAdminUploadFileAppDto,
  ): Promise<ResAdminUploadFileAppDto> {
    this.logger.log(
      'info',
      `이미지 업로드 성공-이미지 경로:${req.file.location}`,
    );
    return { filePath: req.file.location };
  }
}
