import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReqUpdateTaskAppDto {
  @ApiProperty({ description: '작업 고유 ID(INT)' })
  @IsInt()
  id: number;

  @ApiProperty({ description: '작업 이름' })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty({ description: '작업 설명' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ description: '작업 중요도' })
  @IsInt()
  @IsOptional()
  readonly importance: number;
}

export class ResUpdateTaskAppDto {
  @ApiProperty({
    example: '작업 업데이트 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
