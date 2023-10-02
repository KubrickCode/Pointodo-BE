import { UUID } from 'crypto';

export class ReqUpdateTaskAppDto {
  readonly userId: UUID;
  readonly id: number;
  readonly name?: string;
  readonly description?: string;
  readonly importance?: number;
  readonly dueDate?: string;
  readonly completion?: number;
}
