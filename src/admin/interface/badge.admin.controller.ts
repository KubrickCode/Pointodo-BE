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
import { ResGetAllBadgesDto } from '@admin/interface/dto/badge/getAllBadges.dto';
import { globalDocs } from '@shared/docs/global.docs';
import { getAllBadgesDocs } from '@admin/interface/docs/badge/getAllBadges.admin.docs';
import { createBadgeDocs } from '@admin/interface/docs/badge/createBadge.admin.docs';
import { updateBadgeDocs } from '@admin/interface/docs/badge/updateBadge.admin.docs';
import { deleteBadgeDocs } from '@admin/interface/docs/badge/deleteBadge.admin.docs';
import { adminDocs } from '@admin/interface/docs/admin.docs';

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

  @Get('/all')
  @HttpCode(200)
  @ApiOperation(getAllBadgesDocs.operation)
  @ApiOkResponse(getAllBadgesDocs.okResponse)
  async getAllBadges(): Promise<ResGetAllBadgesDto[]> {
    return await this.badgeAdminService.getAllBadges();
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
}
