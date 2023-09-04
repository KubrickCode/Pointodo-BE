import { UUID } from 'crypto';

export class ReqLoginAppDto {
  readonly id: UUID;
  readonly ip: string;
  readonly device: DeviceInfo;
}

export class ResLoginAppDto {
  readonly accessToken: string;
  readonly refreshToken?: string;
}

interface DeviceInfo {
  readonly browser: string;
  readonly platform: string;
  readonly os: string;
  readonly version: string;
}
