import { UserEntity } from '@user/domain/entities/User.entity';

declare global {
  namespace Express {
    interface User extends UserEntity {
      accessToken?: string;
      refreshToken?: string;
    }

    interface Request {
      user?: User | undefined;
    }
  }
}
