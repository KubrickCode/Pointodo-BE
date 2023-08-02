import {
  ReqGetAllPointsLogsAppDto,
  ResGetAllPointsLogsAppDto,
} from '../dto/getAllPointsLogs.app.dto';

export interface IPointService {
  getAllPointsLogs(
    req: ReqGetAllPointsLogsAppDto,
  ): Promise<ResGetAllPointsLogsAppDto[]>;
}
