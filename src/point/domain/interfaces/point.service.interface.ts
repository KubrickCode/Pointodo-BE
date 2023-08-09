import {
  ReqGetEarnedPointsLogsAppDto,
  ResGetEarnedPointsLogsAppDto,
} from '../dto/getEarnedPointsLogs.app.dto';
import {
  ReqGetCurrentPointsAppDto,
  ResGetCurrentPointsAppDto,
} from '../dto/getCurrentPoints.app.dto';
import {
  ReqGetSpentPointsLogsAppDto,
  ResGetSpentPointsLogsAppDto,
} from '../dto/getSpentPointsLogs.app.dto';

export interface IPointService {
  getEarnedPointsLogs(
    req: ReqGetEarnedPointsLogsAppDto,
  ): Promise<ResGetEarnedPointsLogsAppDto[]>;

  getSpentPointsLogs(
    req: ReqGetSpentPointsLogsAppDto,
  ): Promise<ResGetSpentPointsLogsAppDto[]>;

  getCurrentPoints(
    req: ReqGetCurrentPointsAppDto,
  ): Promise<ResGetCurrentPointsAppDto>;
}
