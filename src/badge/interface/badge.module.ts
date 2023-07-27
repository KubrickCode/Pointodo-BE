import { Module } from '@nestjs/common';
import { BadgeController } from './badge.controller';
import { BadgeService } from '../app/badge.service';

@Module({
  controllers: [BadgeController],
  providers: [BadgeService],
})
export class BadgeModule {}
