import { Controller, Inject, Get, Req, UseGuards } from '@nestjs/common';
import { IPointService } from '@point/domain/interfaces/point.service.interface';
import { ResGetAllPointsLogsDto } from './dto/getAllPointsLogs.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '@auth/infrastructure/passport/guards/jwt.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { globalDocs } from '@shared/docs/global.docs';

@Controller('point')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse(globalDocs.unauthorizedResponse)
export class PointController {
  constructor(
    @Inject('IPointService')
    private readonly pointService: IPointService,
  ) {}

  @Get('logs')
  async getAllPointsLogs(
    @Req() req: Request,
  ): Promise<ResGetAllPointsLogsDto[]> {
    return await this.pointService.getAllPointsLogs({ userId: req.user.id });
  }
}
