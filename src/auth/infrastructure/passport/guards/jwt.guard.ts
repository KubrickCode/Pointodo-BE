import {
  AUTH_EMPTY_TOKEN,
  AUTH_EXPIRED_TOKEN,
  AUTH_INVALID_TOKEN,
  JWT_EXPIRED,
  JWT_INVALID_TOKEN,
  JWT_MALFORMED,
  JWT_NOT_PROVIDED,
} from '@shared/messages/auth/auth.errors';
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
import { jwtConfig } from '@shared/config/jwt.config';
import { IUserRepository } from '@user/domain/interfaces/user.repository.interface';
import { DecodedAccessToken } from '@auth/domain/interfaces/decodedToken.interface';
import { USER_NOT_FOUND } from '@shared/messages/user/user.errors';
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
      if (!user) throw new UnauthorizedException(USER_NOT_FOUND);
      return { id: verify.id };
    } catch (error) {
      switch (error.message) {
        case JWT_INVALID_TOKEN:
        case JWT_MALFORMED:
          throw new UnauthorizedException(AUTH_INVALID_TOKEN);
        case JWT_EXPIRED:
          throw new UnauthorizedException(AUTH_EXPIRED_TOKEN);
        case JWT_NOT_PROVIDED:
          throw new UnauthorizedException(AUTH_EMPTY_TOKEN);
        case USER_NOT_FOUND:
          throw new UnauthorizedException(USER_NOT_FOUND);
        default:
          throw new HttpException('서버 오류', 500);
      }
    }
  }
}
