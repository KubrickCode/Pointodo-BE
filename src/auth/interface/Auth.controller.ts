import {
  Controller,
  Post,
  Req,
  UseGuards,
  Res,
  Get,
  Inject,
  Body,
  HttpCode,
  Header,
  HttpStatus,
} from '@nestjs/common';
import { LocalAuthGuard } from '@auth/infrastructure/passport/guards/Local.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/Jwt.guard';
import { GoogleAuthGuard } from '@auth/infrastructure/passport/guards/Google.guard';
import { KakaoAuthGuard } from '@auth/infrastructure/passport/guards/Kakao.guard';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReqLoginDto } from './dto/Login.dto';
import { IAuthService } from '@auth/domain/interfaces/Auth.service.interface';
import { ReqCheckPasswordDto } from './dto/CheckPassword.dto';
import { checkPasswordDocs } from './docs/CheckPassword.docs';
import { globalDocs } from '@shared/docs/Global.docs';
import { loginDocs } from '@auth/interface/docs/Login.docs';
import { logoutDocs } from './docs/Logout.docs';
import { refreshDocs } from './docs/Refresh.docs';
import { socialLoginDocs } from './docs/SocialLogin.docs';
import { validateLoggedInDocs } from './docs/ValidateLoggedIn.docs';
import { jwtExpiration } from '@shared/config/Jwt.config';
import { IHandleDateTime } from '@shared/interfaces/IHandleDateTime';
import { ProviderConstant } from '@shared/constants/Provider.constant';
import useragent from 'express-useragent';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(ProviderConstant.IAUTH_SERVICE)
    private readonly authService: IAuthService,
    @Inject(ProviderConstant.IHANDLE_DATE_TIME)
    private readonly handleDateTime: IHandleDateTime,
  ) {}

  @Get('status')
  @ApiCookieAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation(validateLoggedInDocs.operation)
  @ApiOkResponse(validateLoggedInDocs.okResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  async validateLoggedIn() {
    return true;
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(LocalAuthGuard)
  @ApiOperation(loginDocs.operation)
  @ApiCreatedResponse(loginDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiNotFoundResponse(loginDocs.invalidEmail)
  @ApiUnauthorizedResponse(loginDocs.invalidPassword)
  @ApiConflictResponse(loginDocs.conflictError)
  @ApiBody({ type: ReqLoginDto })
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { browser, platform, os, version } = useragent.parse(
      req.headers['user-agent'],
    );
    const { accessToken, refreshToken } = await this.authService.login({
      id: req.user.id,
      ip: req.ip,
      device: { browser, platform, os, version },
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: this.handleDateTime.getFewDaysLater(
        jwtExpiration.refreshTokenExpirationDays,
      ),
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: this.handleDateTime.getFewDaysLater(
        jwtExpiration.refreshTokenExpirationDays,
      ),
    });
    res.send();
  }

  @Post('logout')
  @ApiCookieAuth('accessToken')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiOperation(logoutDocs.operation)
  @ApiNoContentResponse(logoutDocs.noContentResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.authService.logout(req.user);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.send();
  }

  @Post('refresh')
  @ApiCookieAuth('refreshToken')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation(refreshDocs.operation)
  @ApiCreatedResponse(refreshDocs.createdResponse)
  @ApiUnauthorizedResponse(refreshDocs.unauthorizedResponse)
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const { refreshToken } = req.cookies;
      const { browser, platform, os, version } = useragent.parse(
        req.headers['user-agent'],
      );
      const { accessToken } = await this.authService.refresh({
        refreshToken,
        ip: req.ip,
        device: { browser, platform, os, version },
      });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: this.handleDateTime.getFewDaysLater(
          jwtExpiration.refreshTokenExpirationDays,
        ),
      });
      res.send();
    } catch (error) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.send();
    }
  }

  @Post('check-password')
  @ApiCookieAuth('accessToken')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiOperation(checkPasswordDocs.operation)
  @ApiNoContentResponse(checkPasswordDocs.noContentResponse)
  @ApiUnauthorizedResponse(checkPasswordDocs.invalidCheckPassword)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async checkPassword(
    @Req() req: Request,
    @Body() body: ReqCheckPasswordDto,
  ): Promise<void> {
    await this.authService.checkPassword({
      id: req.user.id,
      password: body.password,
    });
  }

  @Get('google/callback')
  @HttpCode(HttpStatus.FOUND)
  @Header('Location', process.env.ORIGIN)
  @UseGuards(GoogleAuthGuard)
  @ApiOperation(socialLoginDocs.google.operation)
  @ApiFoundResponse(socialLoginDocs.google.foundResponse)
  async googleCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { browser, platform, os, version } = useragent.parse(
      req.headers['user-agent'],
    );
    const { accessToken, refreshToken } = await this.authService.login({
      id: req.user.id,
      ip: req.ip,
      device: { browser, platform, os, version },
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: this.handleDateTime.getFewDaysLater(
        jwtExpiration.refreshTokenExpirationDays,
      ),
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: this.handleDateTime.getFewDaysLater(
        jwtExpiration.refreshTokenExpirationDays,
      ),
    });
    res.send();
  }

  @Get('kakao/callback')
  @HttpCode(HttpStatus.FOUND)
  @Header('Location', process.env.ORIGIN)
  @UseGuards(KakaoAuthGuard)
  @ApiOperation(socialLoginDocs.kakao.operation)
  @ApiFoundResponse(socialLoginDocs.kakao.foundResponse)
  async kakaoCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { browser, platform, os, version } = useragent.parse(
      req.headers['user-agent'],
    );
    const { accessToken, refreshToken } = await this.authService.login({
      id: req.user.id,
      ip: req.ip,
      device: { browser, platform, os, version },
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: this.handleDateTime.getFewDaysLater(
        jwtExpiration.refreshTokenExpirationDays,
      ),
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: this.handleDateTime.getFewDaysLater(
        jwtExpiration.refreshTokenExpirationDays,
      ),
    });
    res.send();
  }
}
