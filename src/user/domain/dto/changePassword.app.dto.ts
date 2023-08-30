import { UUID } from 'crypto';

export class ReqChangePasswordAppDto {
  readonly id: UUID;
  readonly password: string;
}

export class ResChangePasswordAppDto {
  readonly message: string;
}
