import { UUID } from 'crypto';
import {
  EarnedPointsLogWithTaskName,
  SpentPointsLogWithBadgeName,
} from '../entities/pointsLog.entity';
import { Exclude } from 'class-transformer';

export class ReqGetPointsLogsAppDto {
  readonly userId: UUID;
  readonly order: string;
  readonly offset: number;
  readonly limit: number;
}

export class ResGetEarnedPointsLogAppDto extends EarnedPointsLogWithTaskName {
  @Exclude() readonly userId: UUID;
}

export class ResGetSpentPointsLogAppDto extends SpentPointsLogWithBadgeName {
  @Exclude() readonly userId: UUID;
}
