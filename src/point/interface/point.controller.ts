import {
  Controller,
  Inject,
  Get,
  Req,
  UseGuards,
  Query,
  HttpCode,
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
  ReqGetPointsLogsQueryDto,
  ResGetPointsLogsDto,
} from './dto/getPointsLogs.dto';
import { getPointsLogsDocs } from './docs/getPointsLogs.docs';
import {
  ReqGetTotalPointPagesQueryDto,
  ResGetTotalPointPagesDto,
} from './dto/getTotalPointPages.dto';
import { getTotalPointPagesDocs } from './docs/getTotalPointPages.docs';

@Controller('points')
@ApiTags('Point')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class PointController {
  constructor(
    @Inject('IPointService')
    private readonly pointService: IPointService,
  ) {}

  @Get('/logs')
  @HttpCode(200)
  @ApiOperation(getPointsLogsDocs.operation)
  @ApiOkResponse(getPointsLogsDocs.okResponse)
  async getEarnedPointsLogs(
    @Req() req: Request,
    @Query() query: ReqGetPointsLogsQueryDto,
  ): Promise<ResGetPointsLogsDto[]> {
    const { transactionType, offset, limit, order } = query;
    if (transactionType === 'EARNED')
      return await this.pointService.getEarnedPointsLogs({
        userId: req.user.id,
        order,
        offset,
        limit,
      });

    if (transactionType === 'SPENT')
      return await this.pointService.getSpentPointsLogs({
        userId: req.user.id,
        order,
        offset,
        limit,
      });
  }

  @Get('/count-pages')
  @HttpCode(200)
  @ApiOperation(getTotalPointPagesDocs.operation)
  @ApiOkResponse(getTotalPointPagesDocs.okResponse)
  async getTotalPointPages(
    @Req() req: Request,
    @Query() query: ReqGetTotalPointPagesQueryDto,
  ): Promise<ResGetTotalPointPagesDto> {
    const userId = req.user.id;
    const { transactionType, limit } = query;
    return await this.pointService.getTotalPointPages({
      userId,
      transactionType,
      limit,
    });
  }

  @Get('current')
  @ApiOperation(getCurrentPointsDocs.operation)
  @ApiOkResponse(getCurrentPointsDocs.okResponse)
  async getCurrentPoints(@Req() req: Request): Promise<ResGetCurrentPointsDto> {
    return await this.pointService.getCurrentPoints({ userId: req.user.id });
  }
}
