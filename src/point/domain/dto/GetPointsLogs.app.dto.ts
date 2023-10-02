import { UUID } from 'crypto';
import {
  EarnedPointsLogWithTaskName,
  POINT_LOG_ORDER_TYPE,
  SpentPointsLogWithBadgeName,
} from '../entities/PointsLog.entity';
import { Exclude } from 'class-transformer';

export class ReqGetPointsLogsAppDto {
  readonly userId: UUID;
  readonly order: POINT_LOG_ORDER_TYPE;
  readonly offset: number;
  readonly limit: number;
}

export class ResGetEarnedPointsLogAppDto extends EarnedPointsLogWithTaskName {
  @Exclude() readonly userId: UUID;
}

export class ResGetSpentPointsLogAppDto extends SpentPointsLogWithBadgeName {
  @Exclude() readonly userId: UUID;
}
