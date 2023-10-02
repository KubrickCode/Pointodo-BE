import { ICacheService } from '@cache/domain/interfaces/Cache.service.interface';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ReqGetPointsLogsAppDto,
  ResGetEarnedPointsLogAppDto,
  ResGetSpentPointsLogAppDto,
} from '@point/domain/dto/GetPointsLogs.app.dto';
import {
  ReqGetCurrentPointsAppDto,
  ResGetCurrentPointsAppDto,
} from '@point/domain/dto/GetCurrentPoints.app.dto';
import { IPointRepository } from '@point/domain/interfaces/Point.repository.interface';
import { IPointService } from '@point/domain/interfaces/Point.service.interface';
import { cacheConfig } from '@shared/config/Cache.config';
import {
  ReqGetTotalPointPagesAppDto,
  ResGetTotalPointPagesAppDto,
} from '@point/domain/dto/GetTotalPointPages.app.dto';
import { plainToClass } from 'class-transformer';
import { ProviderConstant } from '@shared/constants/Provider.constant';

@Injectable()
export class PointService implements IPointService {
  constructor(
    @Inject(ProviderConstant.IPOINT_REPOSITORY)
    private readonly pointRepository: IPointRepository,
    @Inject(ProviderConstant.ICACHE_SERVICE)
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

    if (transactionType === 'spent') {
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

    if (transactionType === 'spent') {
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
