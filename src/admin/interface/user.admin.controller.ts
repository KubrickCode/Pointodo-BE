import { AdminAuthGuard } from '@auth/infrastructure/passport/guards/admin.guard';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { adminDocs } from './docs/admin.docs';
import { globalDocs } from '@shared/docs/global.docs';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ReqGetUserListQueryDto,
  ResGetUserListDto,
} from './dto/user/getUserList.dto';
import { IUserService } from '@user/domain/interfaces/user.service.interface';
import {
  ReqGetTotalUserListPagesParamDto,
  ResGetTotalUserListPagesDto,
} from './dto/user/getTotalUserListPages.dto';

@ApiTags('Admin - User')
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
@ApiForbiddenResponse(adminDocs.forbidden)
@Controller('/admin/user')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class UserAdminController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @Get('/list')
  @HttpCode(200)
  async getUserList(
    @Query() query: ReqGetUserListQueryDto,
  ): Promise<ResGetUserListDto[]> {
    const { page, order, provider } = query;
    return await this.userService.getUserList({ order, page, provider });
  }

  @Get('/count')
  @HttpCode(200)
  async getTotalUserListPages(
    @Param() param: ReqGetTotalUserListPagesParamDto,
  ): Promise<ResGetTotalUserListPagesDto> {
    const { provider } = param;
    return await this.userService.getTotalUserListPages({ provider });
  }
}
