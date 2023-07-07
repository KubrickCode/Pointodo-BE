import { UserEntity } from '../entities/user.entity';

export interface ITokenService {
  generateAccessToken(payload: UserEntity): string;
}
