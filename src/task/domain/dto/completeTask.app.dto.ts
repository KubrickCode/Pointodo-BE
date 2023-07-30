import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ReqCompleteTaskAppDto {
  @ApiProperty({ description: '작업 고유 ID(INT)' })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '작업 유저 ID(UUID)' })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: '작업 유형 ID(SMALLINT)' })
  @IsInt()
  readonly taskTypesId: number;
}

export class ResCompleteTaskAppDto {
  @ApiProperty({
    example: '작업 완료 성공',
    description: '성공 메시지',
  })
  @IsString()
  readonly message: string;
}
