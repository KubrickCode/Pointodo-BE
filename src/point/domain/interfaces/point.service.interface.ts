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
import {
  ReqGetTotalPointPagesAppDto,
  ResGetTotalPointPagesAppDto,
} from '../dto/getTotalPointPages.app.dto';

export interface IPointService {
  getEarnedPointsLogs(
    req: ReqGetEarnedPointsLogsAppDto,
  ): Promise<ResGetEarnedPointsLogsAppDto[]>;

  getSpentPointsLogs(
    req: ReqGetSpentPointsLogsAppDto,
  ): Promise<ResGetSpentPointsLogsAppDto[]>;

  getTotalPointPages(
    req: ReqGetTotalPointPagesAppDto,
  ): Promise<ResGetTotalPointPagesAppDto>;

  getCurrentPoints(
    req: ReqGetCurrentPointsAppDto,
  ): Promise<ResGetCurrentPointsAppDto>;
}
