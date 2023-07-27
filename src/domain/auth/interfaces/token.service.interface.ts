import {
  ReqGenerateAccessTokenAppDto,
  ReqGenerateRefreshTokenAppDto,
} from '../dto/app/tokenService.app.dto';
import { DecodedAccessToken } from './decodedToken.interface';

export interface ITokenService {
  generateAccessToken(payload: ReqGenerateAccessTokenAppDto): string;
  generateRefreshToken(payload: ReqGenerateRefreshTokenAppDto): string;
  decodeToken(token: string): DecodedAccessToken;
}
