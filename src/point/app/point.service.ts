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
    const { userId, order } = req;
    const cacheKey = `userEarnedPointsLogs:${userId}-order:${order}`;
    const cachedPointsLogs = await this.cacheService.getFromCache<
      ResGetEarnedPointsLogsAppDto[]
    >(cacheKey);
    if (cachedPointsLogs) {
      return cachedPointsLogs;
    }

    const result = await this.pointRepository.getEarnedPointsLogs(
      userId,
      order,
    );

    await this.cacheService.setCache(
      cacheKey,
      result,
      cacheConfig(this.configService).cacheTTL,
    );

    return result;
  }

  async getSpentPointsLogs(
    req: ReqGetSpentPointsLogsAppDto,
  ): Promise<ResGetSpentPointsLogsAppDto[]> {
    const { userId, order } = req;
    const cacheKey = `userSpentPointsLogs:${userId}-order:${order}`;
    const cachedPointsLogs = await this.cacheService.getFromCache<
      ResGetSpentPointsLogsAppDto[]
    >(cacheKey);
    if (cachedPointsLogs) {
      return cachedPointsLogs;
    }

    const result = await this.pointRepository.getSpentPointsLogs(userId, order);

    await this.cacheService.setCache(
      cacheKey,
      result,
      cacheConfig(this.configService).cacheTTL,
    );

    return result;
  }

  async getCurrentPoints(
    req: ReqGetCurrentPointsAppDto,
  ): Promise<ResGetCurrentPointsAppDto> {
    const cacheKey = `userCurrentPoints:${req.userId}`;
    const cachedCurrentPoints = await this.cacheService.getFromCache<number>(
      cacheKey,
    );
    if (cachedCurrentPoints) {
      return { points: cachedCurrentPoints };
    }

    const points = await this.pointRepository.calculateUserPoints(req.userId);

    await this.cacheService.setCache(
      cacheKey,
      points,
      cacheConfig(this.configService).cacheTTL,
    );

    return { points };
  }
}
