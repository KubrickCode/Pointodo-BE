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
