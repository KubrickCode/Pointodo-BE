import { UserEntity } from '@domain/user/entities/user.entity';

declare global {
  namespace Express {
    interface User extends UserEntity {}

    interface Request {
      user?: User | undefined;
    }
  }
}
