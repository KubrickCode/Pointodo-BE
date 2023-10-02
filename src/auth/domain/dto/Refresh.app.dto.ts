import { DeviceInfo } from '../interfaces/Token.service.interface';

export class ReqRefreshAppDto {
  readonly refreshToken: string;
  readonly ip: string;
  readonly device: DeviceInfo;
}

export class ResRefreshAppDto {
  readonly accessToken: string;
}
