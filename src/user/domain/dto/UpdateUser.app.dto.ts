import { UUID } from 'crypto';

export class ReqUpdateUserAppDto {
  readonly id: UUID;
  readonly password: string;
}
