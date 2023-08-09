import { ApiProperty } from '@nestjs/swagger';
import {
  BADGE_ICON_LINK,
  BADGE_TYPE_DESC,
  BADGE_TYPE_ID,
  BADGE_TYPE_NAME,
} from '@shared/constants/badge.constant';
import { CONFLICT_BADGE_NAME } from '@shared/messages/admin/badge.admin.errors';
import { CREATE_BADGE_TYPE_SUCCESS_MESSAGE } from '@shared/messages/admin/badge.admin.messages';
import { IsInt, IsString } from 'class-validator';

export class ReqCreateBadgeTypeDto {
  @ApiProperty({ description: BADGE_TYPE_ID })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: BADGE_TYPE_NAME })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: BADGE_TYPE_DESC })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: BADGE_ICON_LINK })
  @IsString()
  readonly iconLink: string;
}

export class ResCreateBadgeTypeDto {
  @ApiProperty({
    example: CREATE_BADGE_TYPE_SUCCESS_MESSAGE,
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}

export class ResCreateBadgeTypeConflict {
  @ApiProperty({ example: 409, description: '에러 상태 코드' })
  @IsInt()
  readonly statusCode: number;

  @ApiProperty({
    example: CONFLICT_BADGE_NAME,
    description: '에러 메시지',
  })
  @IsString()
  readonly message: string;

  @ApiProperty({
    example: '/api/admin/badge/create',
    description: '요청 경로',
  })
  @IsString()
  readonly path: string;
}
