import {
  ReqGetPointsLogsAppDto,
  ResGetEarnedPointsLogsAppDto,
  ResGetSpentPointsLogsAppDto,
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
  ): Promise<ResGetEarnedPointsLogsAppDto[]>;

  getSpentPointsLogs(
    req: ReqGetPointsLogsAppDto,
  ): Promise<ResGetSpentPointsLogsAppDto[]>;

  getTotalPointPages(
    req: ReqGetTotalPointPagesAppDto,
  ): Promise<ResGetTotalPointPagesAppDto>;

  getCurrentPoints(
    req: ReqGetCurrentPointsAppDto,
  ): Promise<ResGetCurrentPointsAppDto>;
}
