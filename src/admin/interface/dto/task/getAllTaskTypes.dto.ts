import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ResGetAllTaskTypesDto {
  @ApiProperty({ description: '작업 타입 고유 ID(SMALL INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '작업 타입 이름' })
  @IsString()
  readonly name: string;
}
