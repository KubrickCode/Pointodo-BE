import { UserEntity } from '../../user/entities/user.entity';
import { DecodedAccessToken } from './decodedToken.interface';

export interface ITokenService {
  generateAccessToken(payload: UserEntity): string;
  generateRefreshToken(payload: UserEntity): string;
  decodeToken(token: string): DecodedAccessToken;
}
