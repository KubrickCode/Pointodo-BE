import {
  ReqGetAllPointsLogsAppDto,
  ResGetAllPointsLogsAppDto,
} from '../dto/getAllPointsLogs.app.dto';
import {
  ReqGetCurrentPointsAppDto,
  ResGetCurrentPointsAppDto,
} from '../dto/getCurrentPoints.app.dto';

export interface IPointService {
  getAllPointsLogs(
    req: ReqGetAllPointsLogsAppDto,
  ): Promise<ResGetAllPointsLogsAppDto[]>;

  getCurrentPoints(
    req: ReqGetCurrentPointsAppDto,
  ): Promise<ResGetCurrentPointsAppDto>;
}
