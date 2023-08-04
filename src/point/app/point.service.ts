import { Injectable, Inject } from '@nestjs/common';
import {
  ReqGetAllPointsLogsAppDto,
  ResGetAllPointsLogsAppDto,
} from '@point/domain/dto/getAllPointsLogs.app.dto';
import {
  ReqGetCurrentPointsAppDto,
  ResGetCurrentPointsAppDto,
} from '@point/domain/dto/getCurrentPoints.app.dto';
import { IPointRepository } from '@point/domain/interfaces/point.repository.interface';
import { IPointService } from '@point/domain/interfaces/point.service.interface';

@Injectable()
export class PointService implements IPointService {
  constructor(
    @Inject('IPointRepository')
    private readonly pointRepository: IPointRepository,
  ) {}

  async getAllPointsLogs(
    req: ReqGetAllPointsLogsAppDto,
  ): Promise<ResGetAllPointsLogsAppDto[]> {
    return await this.pointRepository.getAllPointsLogs(req.userId);
  }

  async getCurrentPoints(
    req: ReqGetCurrentPointsAppDto,
  ): Promise<ResGetCurrentPointsAppDto> {
    const points = await this.pointRepository.calculateUserPoints(req.userId);
    return { points };
  }
}
