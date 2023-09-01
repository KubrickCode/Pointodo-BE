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
} from '@nestjs/common';
import { LocalAuthGuard } from '@auth/infrastructure/passport/guards/local.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import { GoogleAuthGuard } from '@auth/infrastructure/passport/guards/google.guard';
import { KakaoAuthGuard } from '@auth/infrastructure/passport/guards/kakao.guard';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import { ResChangePasswordDto } from '@user/interface/dto/changePassword.dto';
import { globalDocs } from '@shared/docs/global.docs';
import { loginDocs } from '@auth/interface/docs/login.docs';
import { logoutDocs } from './docs/logout.docs';
import { refreshDocs } from './docs/refresh.docs';
import { socialLoginDocs } from './docs/socialLogin.docs';
import { validateLoggedInDocs } from './docs/validateLoggedIn.docs';
import { jwtExpiration } from '@shared/config/jwt.config';
import { IHandleDateTime } from '@shared/interfaces/IHandleDateTime';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
    @Inject('IHandleDateTime')
    private readonly handleDateTime: IHandleDateTime,
    private readonly configService: ConfigService,
  ) {}

  @Get('status')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(validateLoggedInDocs.operation)
  @ApiOkResponse(validateLoggedInDocs.okResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  async validateLoggedIn() {
    return true;
  }

  @Post('login')
  @HttpCode(201)
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
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @HttpCode(201)
  @ApiCookieAuth('refreshToken')
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
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(checkPasswordDocs.operation)
  @ApiOkResponse(checkPasswordDocs.okResponse)
  @ApiUnauthorizedResponse(checkPasswordDocs.invalidCheckPassword)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async checkPassword(
    @Req() req: Request,
    @Body() body: ReqCheckPasswordDto,
  ): Promise<ResChangePasswordDto> {
    return await this.authService.checkPassword({
      id: req.user.id,
      password: body.password,
    });
  }

  @Get('google/callback')
  @HttpCode(302)
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
  @HttpCode(302)
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
  }
}
