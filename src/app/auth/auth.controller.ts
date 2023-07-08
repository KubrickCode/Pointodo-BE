import { Controller, Post, Req, UseGuards, Res, Get } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';
import { LocalAuthGuard } from '@infrastructure/auth/passport/guards/local.guard';
import { UserEntity } from '@domain/user/entities/user.entity';
import { Response } from 'express';
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';
import { GoogleAuthGuard } from '@infrastructure/auth/passport/guards/google.guard';
import { KakaoAuthGuard } from '@infrastructure/auth/passport/guards/kakao.guard';

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
  @Post('logout')
  async logout(@Req() req: any, @Res() res: Response): Promise<any> {
    const user = req.user as UserEntity;
    await this.authAppService.logout(user);
    res.clearCookie('refreshToken');
    return res.send({ message: 'success' });
  }

  @Get('refresh')
  async refresh(@Req() req: any, @Res() res: Response): Promise<any> {
    const refreshToken = req.cookies['refreshToken'];
    const accessToken = await this.authAppService.refresh(refreshToken);
    res.json({ accessToken });
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req: any, @Res() res: Response) {
    console.log(req.user);
  }

  @UseGuards(KakaoAuthGuard)
  @Get('kakao/callback')
  async kakaoCallback(@Req() req: any, @Res() res: Response) {
    console.log(req.user);
  }
}
