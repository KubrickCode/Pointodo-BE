import { Injectable, Inject } from '@nestjs/common';
import {
  ReqGetAllPointsLogsAppDto,
  ResGetAllPointsLogsAppDto,
} from '@point/domain/dto/getAllPointsLogs.app.dto';
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
}
