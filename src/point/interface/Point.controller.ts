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
import { IPointService } from '@point/domain/interfaces/Point.service.interface';
import { Request } from 'express';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/Jwt.guard';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { globalDocs } from '@shared/docs/Global.docs';
import { ResGetCurrentPointsDto } from './dto/GetCurrentPoints.dto';
import { getCurrentPointsDocs } from './docs/GetCurrentPoints.docs';
import {
  ReqGetPointsLogsQueryDto,
  ResGetEarnedPointsLogsDto,
  ResGetSpentPointsLogsDto,
} from './dto/GetPointsLogs.dto';
import { getPointsLogsDocs } from './docs/GetPointsLogs.docs';
import {
  ReqGetTotalPointPagesQueryDto,
  ResGetTotalPointPagesDto,
} from './dto/GetTotalPointPages.dto';
import { getTotalPointPagesDocs } from './docs/GetTotalPointPages.docs';
import { ProviderConstant } from '@shared/constants/Provider.constant';
import { plainToClass } from 'class-transformer';

@Controller('points')
@ApiCookieAuth('accessToken')
@ApiTags('Point')
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class PointController {
  constructor(
    @Inject(ProviderConstant.IPOINT_SERVICE)
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
