import { UUID } from 'crypto';

export class ReqLoginAppDto {
  readonly id: UUID;
}

export class ResLoginAppDto {
  readonly accessToken: string;
  readonly refreshToken?: string;
}
