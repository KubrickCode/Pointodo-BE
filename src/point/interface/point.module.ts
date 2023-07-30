import { Module } from '@nestjs/common';
import { PointService } from '../app/point.service';
import { PointController } from './point.controller';

@Module({
  providers: [PointService],
  controllers: [PointController],
})
export class PointModule {}
