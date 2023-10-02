import { AuthErrorMessage } from '@shared/messages/auth/Auth.errors';
import {
  Injectable,
  ExecutionContext,
  HttpException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { jwtConfig } from '@shared/config/Jwt.config';
import { IUserRepository } from '@user/domain/interfaces/User.repository.interface';
import { DecodedAccessToken } from '@auth/domain/interfaces/DecodedToken.interface';
import { UserErrorMessage } from '@shared/messages/user/User.errors';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    console.log(request.headers['user-agent']);

    const { accessToken } = request?.cookies;

    request.user = await this.validateToken(accessToken);
    return true;
  }

  async validateToken(token: string) {
    const secretKey = jwtConfig(this.configService).accessTokenSecret;

    try {
      const verify: DecodedAccessToken = this.jwtService.verify(token, {
        secret: secretKey,
      });
      const user = await this.userRepository.findById(verify.id);
      if (!user)
        throw new UnauthorizedException(UserErrorMessage.USER_NOT_FOUND);
      return { id: verify.id };
    } catch (error) {
      switch (error.message) {
        case AuthErrorMessage.JWT_INVALID_TOKEN:
        case AuthErrorMessage.JWT_MALFORMED:
          throw new UnauthorizedException(AuthErrorMessage.AUTH_INVALID_TOKEN);
        case AuthErrorMessage.JWT_EXPIRED:
          throw new UnauthorizedException(AuthErrorMessage.AUTH_EXPIRED_TOKEN);
        case AuthErrorMessage.JWT_NOT_PROVIDED:
          throw new UnauthorizedException(AuthErrorMessage.AUTH_EMPTY_TOKEN);
        case UserErrorMessage.USER_NOT_FOUND:
          throw new UnauthorizedException(UserErrorMessage.USER_NOT_FOUND);
        default:
          throw new HttpException('서버 오류', 500);
      }
    }
  }
}