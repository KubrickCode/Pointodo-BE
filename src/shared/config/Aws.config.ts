import { ConfigService } from '@nestjs/config';

export const awsConfig = (configService: ConfigService) => {
  return {
    awsBucketRegion: configService.get('AWS_BUCKET_REGION'),
    awsBucketName: configService.get('AWS_BUCKET_NAME'),
    awsAccessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    awsSecretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
  };
};
