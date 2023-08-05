import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  Inject,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ReqRegisterDto, ResRegisterDto } from './dto/register.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import { ResGetUserDto } from './dto/getUser.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { registerDocs } from './docs/register.docs';
import { getUserDocs } from './docs/getUser.docs';
import { IUserService } from '@user/domain/interfaces/user.service.interface';
import { ReqChangePasswordDto } from './dto/changePassword.dto';
import { changePasswordDocs } from './docs/changePassword.docs';
import { deleteUserDocs } from './docs/deleteUser.docs';
import { globalDocs } from '@shared/docs/global.docs';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @Post('register')
  @HttpCode(201)
  @ApiOperation(registerDocs.operation)
  @ApiCreatedResponse(registerDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiConflictResponse(registerDocs.existUser)
  async register(@Body() user: ReqRegisterDto): Promise<ResRegisterDto> {
    return this.userService.register(user);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation(getUserDocs.operation)
  @ApiBearerAuth()
  @ApiOkResponse(getUserDocs.okResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  async getUser(@Req() req: Request): Promise<ResGetUserDto> {
    return this.userService.getUser({ id: req.user.id });
  }

  @Patch('password')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation(changePasswordDocs.operation)
  @ApiBearerAuth()
  @ApiOkResponse(changePasswordDocs.okResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async changePassword(
    @Req() req: Request,
    @Body() body: ReqChangePasswordDto,
  ) {
    return this.userService.changePassword({
      id: req.user.id,
      password: body.password,
    });
  }

  @Delete()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation(deleteUserDocs.operation)
  @ApiBearerAuth()
  @ApiOkResponse(deleteUserDocs.okResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  async deleteUser(@Req() req: Request) {
    return this.userService.deleteUser({ id: req.user.id });
  }
}
