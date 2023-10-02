import { UUID } from 'crypto';

export class ReqCompleteTaskAppDto {
  readonly id: number;
  readonly userId: UUID;
}
