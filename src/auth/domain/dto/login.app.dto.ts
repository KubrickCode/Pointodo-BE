import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqLoginAppDto {
  @IsUUID()
  readonly id: UUID;
}

export class ResLoginAppDto {
  readonly accessToken: string;
  readonly refreshToken?: string;
}
