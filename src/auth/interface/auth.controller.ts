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
import { LocalAuthGuard } from '@auth/infrastructure/passport/guards/local.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import { GoogleAuthGuard } from '@auth/infrastructure/passport/guards/google.guard';
import { KakaoAuthGuard } from '@auth/infrastructure/passport/guards/kakao.guard';
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
import { ReqLoginDto } from './dto/login.dto';
import { IAuthService } from '@auth/domain/interfaces/auth.service.interface';
import { ReqCheckPasswordDto } from './dto/checkPassword.dto';
import { checkPasswordDocs } from './docs/checkPassword.docs';
import { globalDocs } from '@shared/docs/global.docs';
import { loginDocs } from '@auth/interface/docs/login.docs';
import { logoutDocs } from './docs/logout.docs';
import { refreshDocs } from './docs/refresh.docs';
import { socialLoginDocs } from './docs/socialLogin.docs';
import { validateLoggedInDocs } from './docs/validateLoggedIn.docs';
import { jwtExpiration } from '@shared/config/jwt.config';
import { IHandleDateTime } from '@shared/interfaces/IHandleDateTime';
import {
  IAUTH_SERVICE,
  IHANDLE_DATE_TIME,
} from '@shared/constants/provider.constant';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(IAUTH_SERVICE)
    private readonly authService: IAuthService,
    @Inject(IHANDLE_DATE_TIME)
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
  @Throttle(1, 5)
  @UseGuards(LocalAuthGuard)
  @ApiOperation(loginDocs.operation)
  @ApiCreatedResponse(loginDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiNotFoundResponse(loginDocs.invalidEmail)
  @ApiUnauthorizedResponse(loginDocs.invalidPassword)
  @ApiConflictResponse(loginDocs.conflictError)
  @ApiBody({ type: ReqLoginDto })
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.login({
      id: req.user.id,
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
      const { accessToken } = await this.authService.refresh({ refreshToken });
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
    res.cookie('accessToken', req.user.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: this.handleDateTime.getFewDaysLater(
        jwtExpiration.refreshTokenExpirationDays,
      ),
    });
    res.cookie('refreshToken', req.user.refreshToken, {
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
    res.cookie('accessToken', req.user.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: this.handleDateTime.getFewDaysLater(
        jwtExpiration.refreshTokenExpirationDays,
      ),
    });
    res.cookie('refreshToken', req.user.refreshToken, {
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
