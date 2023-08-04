import { ICacheService } from '@cache/domain/interfaces/cache.service.interface';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ReqGetAllPointsLogsAppDto,
  ResGetAllPointsLogsAppDto,
} from '@point/domain/dto/getAllPointsLogs.app.dto';
import {
  ReqGetCurrentPointsAppDto,
  ResGetCurrentPointsAppDto,
} from '@point/domain/dto/getCurrentPoints.app.dto';
import { PointEntity } from '@point/domain/entities/point.entity';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import { IPointService } from '@point/domain/interfaces/point.service.interface';
import { cacheConfig } from '@shared/config/cache.config';

@Injectable()
export class PointService implements IPointService {
  constructor(
    @Inject('IPointRepository')
    private readonly pointRepository: IPointRepository,
    @Inject('ICacheService')
    private readonly cacheService: ICacheService,
    private readonly configService: ConfigService,
  ) {}

  async getAllPointsLogs(
    req: ReqGetAllPointsLogsAppDto,
  ): Promise<ResGetAllPointsLogsAppDto[]> {
    const cacheKey = `userPointsLogs:${req.userId}`;
    const cachedPointsLogs = await this.cacheService.getFromCache<
      PointEntity[]
    >(cacheKey);
    if (cachedPointsLogs) {
      return cachedPointsLogs;
    }

    const result = await this.pointRepository.getAllPointsLogs(req.userId);

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
