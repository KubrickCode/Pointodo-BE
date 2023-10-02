import {
  ReqGetPointsLogsAppDto,
  ResGetEarnedPointsLogAppDto,
  ResGetSpentPointsLogAppDto,
} from '../dto/GetPointsLogs.app.dto';
import {
  ReqGetCurrentPointsAppDto,
  ResGetCurrentPointsAppDto,
} from '../dto/GetCurrentPoints.app.dto';
import {
  ReqGetTotalPointPagesAppDto,
  ResGetTotalPointPagesAppDto,
} from '../dto/GetTotalPointPages.app.dto';

export interface IPointService {
  getEarnedPointsLogs(
    req: ReqGetPointsLogsAppDto,
  ): Promise<ResGetEarnedPointsLogAppDto[]>;

  getSpentPointsLogs(
    req: ReqGetPointsLogsAppDto,
  ): Promise<ResGetSpentPointsLogAppDto[]>;

  getTotalPointPages(
    req: ReqGetTotalPointPagesAppDto,
  ): Promise<ResGetTotalPointPagesAppDto>;

  getCurrentPoints(
    req: ReqGetCurrentPointsAppDto,
  ): Promise<ResGetCurrentPointsAppDto>;
}
