import {
  ReqGenerateAccessTokenAppDto,
  ReqGenerateRefreshTokenAppDto,
} from '../dto/tokenService.app.dto';
import { DecodedAccessToken } from './decodedToken.interface';

export interface ITokenService {
  generateAccessToken(payload: ReqGenerateAccessTokenAppDto): string;
  generateRefreshToken(payload: ReqGenerateRefreshTokenAppDto): string;
  decodeToken(token: string): DecodedAccessToken;
}

export interface RefreshInfo {
  readonly refreshToken: string;
  readonly ip: string;
  readonly device: DeviceInfo;
}

export interface DeviceInfo {
  readonly browser: string;
  readonly platform: string;
  readonly os: string;
  readonly version: string;
}
