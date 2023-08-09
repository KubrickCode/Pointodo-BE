import { Controller, Inject, Get, Req, UseGuards } from '@nestjs/common';
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
import { ResGetEarnedPointsLogsDto } from './dto/getEarnedPointsLogs.dto';
import { getEarnedPointsLogsDocs } from './docs/getEarnedPointsLogs.docs';
import { getSpentPointsLogsDocs } from './docs/getSpentPointsLogs.docs';
import { ResGetSpentPointsLogsDto } from './dto/getSpentPointsLogs.dto';

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
  ): Promise<ResGetEarnedPointsLogsDto[]> {
    return await this.pointService.getEarnedPointsLogs({ userId: req.user.id });
  }

  @Get('/logs/spent')
  @ApiOperation(getSpentPointsLogsDocs.operation)
  @ApiOkResponse(getSpentPointsLogsDocs.okResponse)
  async getSpentPointsLogs(
    @Req() req: Request,
  ): Promise<ResGetSpentPointsLogsDto[]> {
    return await this.pointService.getSpentPointsLogs({ userId: req.user.id });
  }

  @Get('current')
  @ApiOperation(getCurrentPointsDocs.operation)
  @ApiOkResponse(getCurrentPointsDocs.okResponse)
  async getCurrentPoints(@Req() req: Request): Promise<ResGetCurrentPointsDto> {
    return await this.pointService.getCurrentPoints({ userId: req.user.id });
  }
}
