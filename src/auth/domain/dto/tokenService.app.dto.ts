import { UUID } from 'crypto';

export class ReqGenerateAccessTokenAppDto {
  readonly id: UUID;
}

export class ReqGenerateRefreshTokenAppDto {
  readonly id: UUID;
}
