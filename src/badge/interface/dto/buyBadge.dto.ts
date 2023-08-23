import { ApiProperty } from '@nestjs/swagger';
import { BADGE_ID } from '@shared/constants/badge.constant';
import {
  ALREADY_EXIST_USER_BADGE,
  BUY_BADGE_CONFLICT_POINTS,
  BUY_BADGE_LESS_POINTS,
} from '@shared/messages/badge/badge.errors';
import { BUY_BADGE_SUCCESS_MESSAGE } from '@shared/messages/badge/badge.messages';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString } from 'class-validator';

export class ReqBuyBadgeDto {
  @ApiProperty({ description: BADGE_ID })
  @Type(() => Number)
  @IsInt()
  readonly badgeId: number;
}

export class ResBuyBadgeDto {
  @ApiProperty({
    example: BUY_BADGE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export class ResBuyBadgeConflictError {
  @ApiProperty({ example: 409, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: `${BUY_BADGE_LESS_POINTS} | ${ALREADY_EXIST_USER_BADGE} | ${BUY_BADGE_CONFLICT_POINTS}`,
    description: '에러 메시지',
  })
  @IsArray()
  readonly message: string[];

  @ApiProperty({ example: '/api/badge/buy', description: '요청 경로' })
  @IsString()
  readonly path: string;
}
