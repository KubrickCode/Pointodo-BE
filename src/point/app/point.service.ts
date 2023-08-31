import { ICacheService } from '@cache/domain/interfaces/cache.service.interface';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ReqGetEarnedPointsLogsAppDto,
  ResGetEarnedPointsLogsAppDto,
} from '@point/domain/dto/getEarnedPointsLogs.app.dto';
import {
  ReqGetCurrentPointsAppDto,
  ResGetCurrentPointsAppDto,
} from '@point/domain/dto/getCurrentPoints.app.dto';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import { IPointService } from '@point/domain/interfaces/point.service.interface';
import { cacheConfig } from '@shared/config/cache.config';
import {
  ReqGetSpentPointsLogsAppDto,
  ResGetSpentPointsLogsAppDto,
} from '@point/domain/dto/getSpentPointsLogs.app.dto';
import {
  ReqGetTotalPointPagesAppDto,
  ResGetTotalPointPagesAppDto,
} from '@point/domain/dto/getTotalPointPages.app.dto';
import { GET_POINTS_LOGS_LIMIT } from '@shared/constants/point.constant';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PointService implements IPointService {
  constructor(
    @Inject('IPointRepository')
    private readonly pointRepository: IPointRepository,
    @Inject('ICacheService')
    private readonly cacheService: ICacheService,
    private readonly configService: ConfigService,
  ) {}

  async getEarnedPointsLogs(
    req: ReqGetEarnedPointsLogsAppDto,
  ): Promise<ResGetEarnedPointsLogsAppDto[]> {
    return await this.pointRepository.getEarnedPointsLogs(
      req.userId,
      GET_POINTS_LOGS_LIMIT,
      (req.page - 1) * GET_POINTS_LOGS_LIMIT,
      req.order,
    );
  }

  async getSpentPointsLogs(
    req: ReqGetSpentPointsLogsAppDto,
  ): Promise<ResGetSpentPointsLogsAppDto[]> {
    const { userId, order, page } = req;
    const cacheKey = `userSpentPointsLogs:${userId}-page:${page}&order:${order}`;
    const cachedPointsLogs = await this.cacheService.getFromCache<
      ResGetSpentPointsLogsAppDto[]
    >(cacheKey);
    if (cachedPointsLogs) {
      return cachedPointsLogs;
    }

    const result = await this.pointRepository.getSpentPointsLogs(
      userId,
      GET_POINTS_LOGS_LIMIT,
      (page - 1) * GET_POINTS_LOGS_LIMIT,
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
    const { userId, transactionType } = req;
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
    const totalPages = Math.ceil(totalPointsLogs / GET_POINTS_LOGS_LIMIT);

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
