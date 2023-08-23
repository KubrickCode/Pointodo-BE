import {
  Controller,
  UseGuards,
  Inject,
  Body,
  Post,
  Param,
  Delete,
  Patch,
  Get,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminAuthGuard } from '@auth/infrastructure/passport/guards/admin.guard';
import { IBadgeAdminService } from '@admin/badge/domain/interfaces/badge.admin.service.interface';
import {
  ReqCreateBadgeDto,
  ResCreateBadgeDto,
} from '@admin/interface/dto/badge/createBadge.dto';
import {
  ReqUpdateBadgeDto,
  ReqUpdateBadgeParamDto,
  ResUpdateBadgeDto,
} from '@admin/interface/dto/badge/updateBadge.dto';
import {
  ReqDeleteBadgeParamDto,
  ResDeleteBadgeDto,
} from '@admin/interface/dto/badge/deleteBadge.dto';
import {
  ReqGetBadgeListParamDto,
  ResGetBadgeListDto,
} from '@admin/interface/dto/badge/getBadgeList.dto';
import { globalDocs } from '@shared/docs/global.docs';
import { getBadgeListDocs } from '@admin/interface/docs/badge/getAllBadges.admin.docs';
import { createBadgeDocs } from '@admin/interface/docs/badge/createBadge.admin.docs';
import { updateBadgeDocs } from '@admin/interface/docs/badge/updateBadge.admin.docs';
import { deleteBadgeDocs } from '@admin/interface/docs/badge/deleteBadge.admin.docs';
import { adminDocs } from '@admin/interface/docs/admin.docs';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Admin - Badge')
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
@ApiForbiddenResponse(adminDocs.forbidden)
@Controller('/admin/badge')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class BadgeAdminController {
  constructor(
    @Inject('IBadgeAdminService')
    private readonly badgeAdminService: IBadgeAdminService,
  ) {}

  @Get('/:type')
  @HttpCode(200)
  @ApiOperation(getBadgeListDocs.operation)
  @ApiOkResponse(getBadgeListDocs.okResponse)
  async getBadgeList(
    @Param() param: ReqGetBadgeListParamDto,
  ): Promise<ResGetBadgeListDto[]> {
    return await this.badgeAdminService.getBadgeList({ type: param.type });
  }

  @Post('/create')
  @HttpCode(201)
  @ApiOperation(createBadgeDocs.operation)
  @ApiOkResponse(createBadgeDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiConflictResponse(createBadgeDocs.conflict)
  async createBadge(
    @Body() body: ReqCreateBadgeDto,
  ): Promise<ResCreateBadgeDto> {
    console.log(body);
    return await this.badgeAdminService.createBadge(body);
  }

  @Patch('/update/:id')
  @HttpCode(201)
  @ApiOperation(updateBadgeDocs.operation)
  @ApiOkResponse(updateBadgeDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiConflictResponse(updateBadgeDocs.conflict)
  async updateBadge(
    @Body() body: ReqUpdateBadgeDto,
    @Param() param: ReqUpdateBadgeParamDto,
  ): Promise<ResUpdateBadgeDto> {
    return await this.badgeAdminService.updateBadge({
      ...body,
      id: param.id,
    });
  }

  @Delete('/delete/:id')
  @HttpCode(200)
  @ApiOperation(deleteBadgeDocs.operation)
  @ApiOkResponse(deleteBadgeDocs.okResponse)
  async deleteBadge(
    @Param() param: ReqDeleteBadgeParamDto,
  ): Promise<ResDeleteBadgeDto> {
    return await this.badgeAdminService.deleteBadge({ id: param.id });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.MulterS3.File) {
    return await this.badgeAdminService.uploadFile(file);
  }
}
