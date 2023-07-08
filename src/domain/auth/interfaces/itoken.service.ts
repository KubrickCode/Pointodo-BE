import { UserEntity } from '../../user/entities/user.entity';
import { DecodedToken } from './decodedToken';

export interface ITokenService {
  generateAccessToken(payload: UserEntity): string;
  generateRefreshToken(payload: UserEntity): string;
  decodeToken(token: string): DecodedToken;
}
