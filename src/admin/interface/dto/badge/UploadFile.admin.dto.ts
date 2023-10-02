import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResAdminUploadFileDto {
  @ApiProperty({ description: '이미지 경로' })
  @IsString()
  readonly filePath: string;
}
