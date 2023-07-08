import { Controller, Post, Req, UseGuards, Res, Get } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';
import { LocalAuthGuard } from '@infrastructure/auth/passport/guards/local.guard';
import { UserEntity } from '@domain/user/entities/user.entity';
import { Response } from 'express';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authAppService: AuthAppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any, @Res() res: Response): Promise<void> {
    const user = req.user as UserEntity;
    const { accessToken, refreshToken } = await this.authAppService.login(user);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.json({ accessToken });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@Req() req: Request, @Res() res: Response): any {
    // const refreshToken = req.cookies.refreshToken;
    // if (refreshToken) {
    //   await this.redisService.delete(refreshToken); // Remove the refresh token from Redis
    // }
    res.clearCookie('refreshToken');
    return res.send({ message: 'success' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/is-login')
  isLogin(): any {
    return { message: '로그인 상태입니다' };
  }
}
