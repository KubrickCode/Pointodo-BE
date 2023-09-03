import { AdminAuthGuard } from '@auth/infrastructure/passport/guards/admin.guard';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { adminDocs } from './docs/admin.docs';
import { globalDocs } from '@shared/docs/global.docs';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ReqAdminGetUserListQueryDto,
  ResAdminGetUserListDto,
} from './dto/user/getUserList.admin.dto';
import { IUserService } from '@user/domain/interfaces/user.service.interface';
import {
  ReqAdminGetTotalUserListPagesQueryDto,
  ResAdminGetTotalUserListPagesDto,
} from './dto/user/getTotalUserListPages.admin.dto';
import {
  ResAdminGetUserBadgeListDto,
  ReqAdminGetUserBadgeListParamDto,
} from './dto/user/getUserBadgeList.admin.dto';
import { IBadgeService } from '@badge/domain/interfaces/badge.service.interface';
import { ReqAdminPutBadgeToUserQueryDto } from './dto/user/putBadgeToUser.admin.dto';
import { ReqAdminDeleteUserBadgeQueryDto } from './dto/user/deleteUserBadge.admin.dto';
import { getUserListDocs } from './docs/user/getUserList.admin.docs';
import { getTotalUserListPagesDocs } from './docs/user/getTotalUserListPages.admin.docs';
import { getUserBadgeListDocs } from '@badge/interface/docs/getUserBadgeList.docs';
import { putBadgeToUserDocs } from './docs/user/putBadgeToUser.admin.docs';
import { deleteUserBadgeDocs } from './docs/user/deleteUserBadge.admin.docs';
import {
  IBADGE_SERVICE,
  IUSER_SERVICE,
} from '@shared/constants/provider.constant';
@Controller('/admin/users')
@ApiTags('Admin - User')
@ApiCookieAuth('accessToken')
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
@ApiForbiddenResponse(adminDocs.forbidden)
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class UserAdminController {
  constructor(
    @Inject(IUSER_SERVICE)
    private readonly userService: IUserService,
    @Inject(IBADGE_SERVICE)
    private readonly badgeService: IBadgeService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getUserListDocs.operation)
  @ApiOkResponse(getUserListDocs.okResponse)
  async getUserList(
    @Query() query: ReqAdminGetUserListQueryDto,
  ): Promise<ResAdminGetUserListDto[]> {
    return await this.userService.getUserList({
      ...query,
    });
  }

  @Get('/count-pages')
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getTotalUserListPagesDocs.operation)
  @ApiOkResponse(getTotalUserListPagesDocs.okResponse)
  async getTotalUserListPages(
    @Query() query: ReqAdminGetTotalUserListPagesQueryDto,
  ): Promise<ResAdminGetTotalUserListPagesDto> {
    return await this.userService.getTotalUserListPages({ ...query });
  }

  @Get('/badges/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getUserBadgeListDocs.operation)
  @ApiOkResponse(getUserBadgeListDocs.okResponse)
  async getUserBadgeList(
    @Param() param: ReqAdminGetUserBadgeListParamDto,
  ): Promise<ResAdminGetUserBadgeListDto[]> {
    const { id } = param;
    return await this.badgeService.getUserBadgeListWithName({ userId: id });
  }

  @Put('/badges')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation(putBadgeToUserDocs.operation)
  @ApiNoContentResponse(putBadgeToUserDocs.noContentResponse)
  async putBadgeToUser(
    @Query() query: ReqAdminPutBadgeToUserQueryDto,
  ): Promise<void> {
    const { userId, badgeId } = query;
    await this.badgeService.putBadgeToUser({ userId, badgeId });
  }

  @Delete('/badges')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation(deleteUserBadgeDocs.operation)
  @ApiNoContentResponse(deleteUserBadgeDocs.noContentResponse)
  async deleteUserBadge(
    @Query() query: ReqAdminDeleteUserBadgeQueryDto,
  ): Promise<void> {
    const { userId, badgeId } = query;
    await this.badgeService.deleteUserBadge({ userId, badgeId });
  }
}
