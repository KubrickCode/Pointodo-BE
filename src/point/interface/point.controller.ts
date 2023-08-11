import {
  Controller,
  Inject,
  Get,
  Req,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { IPointService } from '@point/domain/interfaces/point.service.interface';
import { Request } from 'express';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { globalDocs } from '@shared/docs/global.docs';
import { ResGetCurrentPointsDto } from './dto/getCurrentPoints.dto';
import { getCurrentPointsDocs } from './docs/getCurrentPoints.docs';
import {
  ReqGetEarnedPointsLogsQueryDto,
  ResGetEarnedPointsLogsDto,
} from './dto/getEarnedPointsLogs.dto';
import { getEarnedPointsLogsDocs } from './docs/getEarnedPointsLogs.docs';
import { getSpentPointsLogsDocs } from './docs/getSpentPointsLogs.docs';
import {
  ReqGetSpentPointsLogsQueryDto,
  ResGetSpentPointsLogsDto,
} from './dto/getSpentPointsLogs.dto';
import {
  ReqGetTotalPointPagesParamDto,
  ResGetTotalPointPagesDto,
} from './dto/getTotalPointPages.dto';
import { getTotalPointPagesDocs } from './docs/getTotalPointPages.docs';

@Controller('point')
@ApiTags('Point')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class PointController {
  constructor(
    @Inject('IPointService')
    private readonly pointService: IPointService,
  ) {}

  @Get('/logs/earned')
  @ApiOperation(getEarnedPointsLogsDocs.operation)
  @ApiOkResponse(getEarnedPointsLogsDocs.okResponse)
  async getEarnedPointsLogs(
    @Req() req: Request,
    @Query() query: ReqGetEarnedPointsLogsQueryDto,
  ): Promise<ResGetEarnedPointsLogsDto[]> {
    const { order, page } = query;
    return await this.pointService.getEarnedPointsLogs({
      userId: req.user.id,
      order,
      page,
    });
  }

  @Get('/logs/spent')
  @ApiOperation(getSpentPointsLogsDocs.operation)
  @ApiOkResponse(getSpentPointsLogsDocs.okResponse)
  async getSpentPointsLogs(
    @Req() req: Request,
    @Query() query: ReqGetSpentPointsLogsQueryDto,
  ): Promise<ResGetSpentPointsLogsDto[]> {
    const { order, page } = query;
    return await this.pointService.getSpentPointsLogs({
      userId: req.user.id,
      order,
      page,
    });
  }

  @Get('/count/:transactionType')
  @ApiOperation(getTotalPointPagesDocs.operation)
  @ApiOkResponse(getTotalPointPagesDocs.okResponse)
  async getTotalTaskPages(
    @Req() req: Request,
    @Param() param: ReqGetTotalPointPagesParamDto,
  ): Promise<ResGetTotalPointPagesDto> {
    const userId = req.user.id;
    const { transactionType } = param;
    return await this.pointService.getTotalPointPages({
      userId,
      transactionType,
    });
  }

  @Get('current')
  @ApiOperation(getCurrentPointsDocs.operation)
  @ApiOkResponse(getCurrentPointsDocs.okResponse)
  async getCurrentPoints(@Req() req: Request): Promise<ResGetCurrentPointsDto> {
    return await this.pointService.getCurrentPoints({ userId: req.user.id });
  }
}
