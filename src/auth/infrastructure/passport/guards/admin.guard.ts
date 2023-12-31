import { AUTH_INVALID_ADMIN } from '@shared/messages/auth/auth.errors';
import { IAuthService } from '@auth/domain/interfaces/auth.service.interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.user;

    try {
      await this.authService.validateAdmin({ id });
      return true;
    } catch (e) {
      throw new ForbiddenException(AUTH_INVALID_ADMIN);
    }
  }
}
