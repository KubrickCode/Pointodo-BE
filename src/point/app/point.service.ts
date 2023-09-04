import { ICacheService } from '@cache/domain/interfaces/cache.service.interface';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ReqGetPointsLogsAppDto,
  ResGetEarnedPointsLogAppDto,
  ResGetSpentPointsLogAppDto,
} from '@point/domain/dto/getPointsLogs.app.dto';
import {
  ReqGetCurrentPointsAppDto,
  ResGetCurrentPointsAppDto,
} from '@point/domain/dto/getCurrentPoints.app.dto';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import { IPointService } from '@point/domain/interfaces/point.service.interface';
import { cacheConfig } from '@shared/config/cache.config';
import {
  ReqGetTotalPointPagesAppDto,
  ResGetTotalPointPagesAppDto,
} from '@point/domain/dto/getTotalPointPages.app.dto';
import { plainToClass } from 'class-transformer';
import {
  ICACHE_SERVICE,
  IPOINT_REPOSITORY,
} from '@shared/constants/provider.constant';

@Injectable()
export class PointService implements IPointService {
  constructor(
    @Inject(IPOINT_REPOSITORY)
    private readonly pointRepository: IPointRepository,
    @Inject(ICACHE_SERVICE)
    private readonly cacheService: ICacheService,
    private readonly configService: ConfigService,
  ) {}

  async getEarnedPointsLogs(
    req: ReqGetPointsLogsAppDto,
  ): Promise<ResGetEarnedPointsLogAppDto[]> {
    const { userId, order, offset, limit } = req;
    return await this.pointRepository.getEarnedPointsLogs(
      userId,
      limit,
      (offset - 1) * limit,
      order,
    );
  }

  async getSpentPointsLogs(
    req: ReqGetPointsLogsAppDto,
  ): Promise<ResGetSpentPointsLogAppDto[]> {
    const { userId, order, offset, limit } = req;
    const cacheKey = `userSpentPointsLogs:${userId}-page:${offset}&order:${order}`;
    const cachedPointsLogs = await this.cacheService.getFromCache<
      ResGetSpentPointsLogAppDto[]
    >(cacheKey);
    if (cachedPointsLogs) {
      return cachedPointsLogs;
    }

    const result = await this.pointRepository.getSpentPointsLogs(
      userId,
      limit,
      (offset - 1) * limit,
      order,
    );

    await this.cacheService.setCache(
      cacheKey,
      result,
      cacheConfig(this.configService).cacheTTL,
    );

    return result;
  }

  async getTotalPointPages(
    req: ReqGetTotalPointPagesAppDto,
  ): Promise<ResGetTotalPointPagesAppDto> {
    const { userId, transactionType, limit } = req;
    const cacheKey = `SPENTtotalPointPages:${userId}`;

    if (transactionType === 'SPENT') {
      const cachedtotalPointPages =
        await this.cacheService.getFromCache<number>(cacheKey);
      if (cachedtotalPointPages) {
        return { totalPages: cachedtotalPointPages };
      }
    }

    const totalPointsLogs = await this.pointRepository.getTotalPointPages(
      userId,
      transactionType,
    );
    const totalPages = Math.ceil(totalPointsLogs / limit);

    if (transactionType === 'SPENT') {
      await this.cacheService.setCache(
        cacheKey,
        totalPages,
        cacheConfig(this.configService).cacheTTL,
      );
    }

    return { totalPages };
  }

  async getCurrentPoints(
    req: ReqGetCurrentPointsAppDto,
  ): Promise<ResGetCurrentPointsAppDto> {
    const points = await this.pointRepository.calculateUserPoints(req.userId);

    return plainToClass(ResGetCurrentPointsAppDto, { points });
  }
}
