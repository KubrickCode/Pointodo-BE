import {
  ReqGetPointsLogsAppDto,
  ResGetEarnedPointsLogAppDto,
  ResGetSpentPointsLogAppDto,
} from '../dto/getPointsLogs.app.dto';
import {
  ReqGetCurrentPointsAppDto,
  ResGetCurrentPointsAppDto,
} from '../dto/getCurrentPoints.app.dto';
import {
  ReqGetTotalPointPagesAppDto,
  ResGetTotalPointPagesAppDto,
} from '../dto/getTotalPointPages.app.dto';

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
