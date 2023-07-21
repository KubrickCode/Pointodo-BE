import { AUTH_INVALID_ADMIN } from '@domain/auth/errors/auth.errors';
import { IAuthService } from '@domain/auth/interfaces/auth.service.interface';
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
    const userId = request.user.id;

    try {
      await this.authService.validateAdmin({ id: userId });
      return true;
    } catch (e) {
      throw new ForbiddenException(AUTH_INVALID_ADMIN);
    }
  }
}
