import { UserEntity } from '@domain/user/entities/user.entity';

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
