import { UUID } from 'crypto';

export class ReqLogoutAppDto {
  readonly id: UUID;
}

export class ResLogoutAppDto {
  readonly message: string;
}
