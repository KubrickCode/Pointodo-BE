import { UserEntity } from '../../user/entities/user.entity';

export interface ITokenService {
  generateAccessToken(payload: UserEntity): string;
}
