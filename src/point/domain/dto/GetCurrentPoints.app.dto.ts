import { UUID } from 'crypto';

export class ReqGetCurrentPointsAppDto {
  readonly userId: UUID;
}

export class ResGetCurrentPointsAppDto {
  readonly points: number;
}
