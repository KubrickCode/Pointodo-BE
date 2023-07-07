import { Controller, Post, Req, UseGuards, Res } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';
import { LocalAuthGuard } from '@infrastructure/auth/passport/guards/local.guard';
import { UserEntity } from '@domain/user/entities/user.entity';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authAppService: AuthAppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any, @Res() res: Response): Promise<void> {
    const user = req.user as UserEntity;
    const accessToken = this.authAppService.generateAccessToken(user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.send();
  }

  @Post('/logout')
  logout(@Req() req: Request, @Res() res: Response): any {
    res.cookie('accessToken', '', {
      maxAge: 0,
    });
    return res.send({
      message: 'success',
    });
  }
}
