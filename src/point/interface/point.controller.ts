import { Controller, Inject, Get, Req, UseGuards } from '@nestjs/common';
import { IPointService } from '@point/domain/interfaces/point.service.interface';
import { ResGetAllPointsLogsDto } from './dto/getAllPointsLogs.dto';
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
import { getAllPointsLogsDocs } from './docs/getAllPointsLogs.docs';
import { ResGetCurrentPointsDto } from './dto/getCurrentPoints.dto';
import { getCurrentPointsDocs } from './docs/getCurrentPoints.docs';

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

  @Get('logs')
  @ApiOperation(getAllPointsLogsDocs.operation)
  @ApiOkResponse(getAllPointsLogsDocs.okResponse)
  async getAllPointsLogs(
    @Req() req: Request,
  ): Promise<ResGetAllPointsLogsDto[]> {
    return await this.pointService.getAllPointsLogs({ userId: req.user.id });
  }

  @Get('current')
  @ApiOperation(getCurrentPointsDocs.operation)
  @ApiOkResponse(getCurrentPointsDocs.okResponse)
  async getCurrentPoints(@Req() req: Request): Promise<ResGetCurrentPointsDto> {
    return await this.pointService.getCurrentPoints({ userId: req.user.id });
  }
}
