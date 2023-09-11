import {
  Controller,
  Inject,
  Get,
  Req,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { IPointService } from '@point/domain/interfaces/point.service.interface';
import { Request } from 'express';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import {
  ApiCookieAuth,
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
  ResGetEarnedPointsLogsDto,
  ResGetSpentPointsLogsDto,
} from './dto/getPointsLogs.dto';
import { getPointsLogsDocs } from './docs/getPointsLogs.docs';
import {
  ReqGetTotalPointPagesQueryDto,
  ResGetTotalPointPagesDto,
} from './dto/getTotalPointPages.dto';
import { getTotalPointPagesDocs } from './docs/getTotalPointPages.docs';
import { IPOINT_SERVICE } from '@shared/constants/provider.constant';
import { plainToClass } from 'class-transformer';

@Controller('points')
@ApiCookieAuth('accessToken')
@ApiTags('Point')
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class PointController {
  constructor(
    @Inject(IPOINT_SERVICE)
    private readonly pointService: IPointService,
  ) {}

  @Get('/logs')
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getPointsLogsDocs.operation)
  @ApiOkResponse(getPointsLogsDocs.okResponseEarned)
  @ApiOkResponse(getPointsLogsDocs.okResponseSpent)
  async getEarnedPointsLogs(
    @Req() req: Request,
    @Query() query: ReqGetPointsLogsQueryDto,
  ): Promise<ResGetEarnedPointsLogsDto[] | ResGetSpentPointsLogsDto[]> {
    const { transactionType, offset, limit, order } = query;
    if (transactionType === 'earned') {
      const result = await this.pointService.getEarnedPointsLogs({
        userId: req.user.id,
        order,
        offset,
        limit,
      });
      return result.map((item) =>
        plainToClass(ResGetEarnedPointsLogsDto, item),
      );
    }

    if (transactionType === 'spent') {
      const result = await this.pointService.getSpentPointsLogs({
        userId: req.user.id,
        order,
        offset,
        limit,
      });
      return result.map((item) => plainToClass(ResGetSpentPointsLogsDto, item));
    }
  }

  @Get('/count-pages')
  @HttpCode(HttpStatus.OK)
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

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation(getCurrentPointsDocs.operation)
  @ApiOkResponse(getCurrentPointsDocs.okResponse)
  async getCurrentPoints(@Req() req: Request): Promise<ResGetCurrentPointsDto> {
    return await this.pointService.getCurrentPoints({ userId: req.user.id });
  }
}
