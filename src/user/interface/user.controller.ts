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
  Res,
} from '@nestjs/common';
import { ReqRegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import { ResGetUserDto } from './dto/getUser.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { registerDocs } from './docs/register.docs';
import { getUserDocs } from './docs/getUser.docs';
import { IUserService } from '@user/domain/interfaces/user.service.interface';
import { ReqUpdateUserDto } from './dto/updateUser.dto';
import { deleteUserDocs } from './docs/deleteUser.docs';
import { globalDocs } from '@shared/docs/global.docs';
import { plainToClass } from 'class-transformer';
import { updateUserDocs } from './docs/updateUser.docs';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @Post('')
  @HttpCode(201)
  @ApiOperation(registerDocs.operation)
  @ApiCreatedResponse(registerDocs.createdResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiConflictResponse(registerDocs.existUser)
  async register(@Body() user: ReqRegisterDto): Promise<void> {
    await this.userService.register(user);
    return;
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation(getUserDocs.operation)
  @ApiBearerAuth()
  @ApiOkResponse(getUserDocs.okResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  async getUser(@Req() req: Request): Promise<ResGetUserDto> {
    const result = await this.userService.getUser({ id: req.user.id });
    return plainToClass(ResGetUserDto, result);
  }

  @Patch('')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiOperation(updateUserDocs.operation)
  @ApiBearerAuth()
  @ApiNoContentResponse(updateUserDocs.noContentResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  async updateUser(@Req() req: Request, @Body() body: ReqUpdateUserDto) {
    await this.userService.updateUser({
      id: req.user.id,
      password: body.password,
    });
    return;
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiOperation(deleteUserDocs.operation)
  @ApiBearerAuth()
  @ApiNoContentResponse(deleteUserDocs.noContentResponse)
  @ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
  async deleteUser(@Req() req: Request, @Res() res: Response) {
    await this.userService.deleteUser({ id: req.user.id });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.send();
  }
}
