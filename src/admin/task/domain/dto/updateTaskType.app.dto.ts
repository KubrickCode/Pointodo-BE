import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqUpdateTaskTypeAppDto {
  @ApiProperty({ description: '작업 타입 고유 ID(SMALL INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '작업 타입 이름' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name: string;
}

export class ResUpdateTaskTypeAppDto {
  @ApiProperty({
    example: '작업 타입 업데이트 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
