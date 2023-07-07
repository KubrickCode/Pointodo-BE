import { Controller, Post, Request, UseGuards, Res } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';
import { LocalAuthGuard } from '@infrastructure/auth/passport/guards/local.guard';
import { UserEntity } from '@domain/user/entities/user.entity';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authAppService: AuthAppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any, @Res() res: Response): Promise<void> {
    const user = req.user as UserEntity;
    const accessToken = this.authAppService.generateAccessToken(user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.send();
  }
}
