import { UUID } from 'crypto';
import { DeviceInfo } from '../interfaces/token.service.interface';

export class ReqLoginAppDto {
  readonly id: UUID;
  readonly ip: string;
  readonly device: DeviceInfo;
}

export class ResLoginAppDto {
  readonly accessToken: string;
  readonly refreshToken?: string;
}
