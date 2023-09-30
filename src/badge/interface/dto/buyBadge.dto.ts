import { ApiProperty } from '@nestjs/swagger';
import { BadgeConstant } from '@shared/constants/badge.constant';
import { BadgeErrorMessage } from '@shared/messages/badge/badge.errors';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString } from 'class-validator';

export class ReqBuyBadgeParamDto {
  @ApiProperty({ description: BadgeConstant.BADGE_ID })
  @Type(() => Number)
  @IsInt()
  readonly badgeId: number;
}

export class ResBuyBadgeConflictError {
  @ApiProperty({ example: 409, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: `${BadgeErrorMessage.BUY_BADGE_LESS_POINTS} | ${BadgeErrorMessage.ALREADY_EXIST_USER_BADGE} | ${BadgeErrorMessage.BUY_BADGE_CONFLICT_POINTS}`,
    description: '에러 메시지',
  })
  @IsArray()
  readonly message: string[];

  @ApiProperty({ example: '/api/badge/buy', description: '요청 경로' })
  @IsString()
  readonly path: string;
}
