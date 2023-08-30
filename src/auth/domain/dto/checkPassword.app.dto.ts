import { UUID } from 'crypto';

export class ReqCheckPasswordAppDto {
  readonly id: UUID;
  readonly password: string;
}

export class ResCheckPasswordAppDto {
  readonly message: string;
}
