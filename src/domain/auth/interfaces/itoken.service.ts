import { UserEntity } from '../../user/entities/user.entity';

export interface ITokenService {
  generateAccessToken(payload: UserEntity): string;
  generateRefreshToken(payload: UserEntity): string;
}
