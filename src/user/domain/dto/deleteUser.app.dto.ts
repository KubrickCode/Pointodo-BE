import { UUID } from 'crypto';

export class ReqDeleteUserAppDto {
  readonly id: UUID;
}

export class ResDeleteUserAppDto {
  readonly message: string;
}
