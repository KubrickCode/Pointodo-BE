import { DeviceInfo } from './login.app.dto';

export class ReqRefreshAppDto {
  readonly refreshToken: string;
  readonly ip: string;
  readonly device: DeviceInfo;
}

export class ResRefreshAppDto {
  readonly accessToken: string;
}
