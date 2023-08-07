import { ApiProperty } from '@nestjs/swagger';
import { BADGE_TYPE_NAME } from '@shared/constants/badge.constant';
import {
  ALREADY_EXIST_USER_BADGE,
  BUY_BADGE_CONFLICT_POINTS,
  BUY_BADGE_LESS_POINTS,
} from '@shared/messages/badge/badge.errors';
import { BUY_BADGE_SUCCESS_MESSAGE } from '@shared/messages/badge/badge.messages';
import { IsString } from 'class-validator';

export class ReqBuyBadgeDto {
  @ApiProperty({ description: BADGE_TYPE_NAME })
  @IsString()
  readonly badgeType: string;
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
  @IsString()
  readonly statusCode: number;

  @ApiProperty({
    example: `${BUY_BADGE_LESS_POINTS} | ${ALREADY_EXIST_USER_BADGE} | ${BUY_BADGE_CONFLICT_POINTS}`,
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string[];

  @ApiProperty({ example: '/api/badge/buy', description: '요청 경로' })
  @IsString()
  readonly path: string;
}
