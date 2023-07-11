import {
  Injectable,
  ExecutionContext,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { jwtConfig } from 'config/jwt.config';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    const token = authorization.replace('Bearer ', '');
    request.user = this.validateToken(token);
    return true;
  }

  validateToken(token: string) {
    const secretKey = jwtConfig(this.configService).accessTokenSecret;

    try {
      const verify = this.jwtService.verify(token, { secret: secretKey });
      return verify;
    } catch (e) {
      switch (e.message) {
        case 'invalid token':
        case 'jwt malformed':
          throw new UnauthorizedException('유효하지 않은 토큰입니다.');
        case 'jwt expired':
          throw new UnauthorizedException('토큰이 만료되었습니다.');
        default:
          throw new HttpException('서버 오류입니다.', 500);
      }
    }
  }
}
