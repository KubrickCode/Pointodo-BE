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
import { JwtAuthGuard } from '@infrastructure/auth/passport/guards/jwt.guard';
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
import { AdminAuthGuard } from '@infrastructure/auth/passport/guards/admin.guard';
import { globalDocs } from '@interface/docs/global/global.docs';
import { adminDocs } from '@interface/docs/admin/admin.docs';
import { IPointAdminService } from '@domain/admin/point/interfaces/point.admin.service.interface';
import {
  ReqDeletePointTransactionTypeParamDto,
  ResDeletePointTransactionTypeDto,
} from '@interface/dto/admin/point/deletePointTransactionType.dto';
import { getAllPointTransactionTypesDocs } from '@interface/docs/admin/point/getAllPointTransactionTypes.admin.docs';
import { createPointTransactionTypeDocs } from '@interface/docs/admin/point/createPointTransactionType.admin.docs';
import { updatePointTransactionTypeDocs } from '@interface/docs/admin/point/updatePointTransactionType.admin.docs';
import { deletePointTransactionTypeDocs } from '@interface/docs/admin/point/deletePointTransactionType.admin.docs';
import { ResGetAllPointTransactionTypesDto } from '@interface/dto/admin/point/getAllPointTransactionTypes.dto';
import {
  ReqCreatePointTransactionTypeDto,
  ResCreatePointTransactionTypeDto,
} from '@interface/dto/admin/point/createPointTransactionType.dto';
import {
  ReqUpdatePointTransactionTypeDto,
  ReqUpdatePointTransactionTypeParamDto,
  ResUpdatePointTransactionTypeDto,
} from '@interface/dto/admin/point/updatePointTransactionType.dto';

@ApiTags('Admin - Point')
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
@ApiForbiddenResponse(adminDocs.forbidden)
@Controller('/admin/point')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class PointAdminController {
  constructor(
    @Inject('IPointAdminService')
    private readonly pointAdminService: IPointAdminService,
  ) {}

  @Get('/all')
  @HttpCode(200)
  @ApiOperation(getAllPointTransactionTypesDocs.operation)
  @ApiOkResponse(getAllPointTransactionTypesDocs.okResponse)
  async getAllPointTransactionTypes(): Promise<
    ResGetAllPointTransactionTypesDto[]
  > {
    return await this.pointAdminService.getAllPointTransactionTypes();
  }

  @Post('/create')
  @HttpCode(201)
  @ApiOperation(createPointTransactionTypeDocs.operation)
  @ApiOkResponse(createPointTransactionTypeDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiConflictResponse(createPointTransactionTypeDocs.conflict)
  async createPointTransactionType(
    @Body() body: ReqCreatePointTransactionTypeDto,
  ): Promise<ResCreatePointTransactionTypeDto> {
    return await this.pointAdminService.createPointTransactionType(body);
  }

  @Patch('/update/:id')
  @HttpCode(201)
  @ApiOperation(updatePointTransactionTypeDocs.operation)
  @ApiOkResponse(updatePointTransactionTypeDocs.okResponse)
  @ApiBadRequestResponse(globalDocs.invalidationResponse)
  @ApiConflictResponse(updatePointTransactionTypeDocs.conflict)
  async updatePointTransactionType(
    @Body() body: ReqUpdatePointTransactionTypeDto,
    @Param() param: ReqUpdatePointTransactionTypeParamDto,
  ): Promise<ResUpdatePointTransactionTypeDto> {
    return await this.pointAdminService.updatePointTransactionType({
      ...body,
      id: param.id,
    });
  }

  @Delete('/delete/:id')
  @HttpCode(200)
  @ApiOperation(deletePointTransactionTypeDocs.operation)
  @ApiOkResponse(deletePointTransactionTypeDocs.okResponse)
  async deletePointTransactionType(
    @Param() param: ReqDeletePointTransactionTypeParamDto,
  ): Promise<ResDeletePointTransactionTypeDto> {
    return await this.pointAdminService.deletePointTransactionType(param.id);
  }
}
