import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import { awsConfig } from '@shared/config/aws.config';

export const multerOptionsFactory = (
  configService: ConfigService,
): MulterOptions => {
  const s3 = new S3Client({
    region: awsConfig(configService).awsBucketRegion,
    credentials: {
      accessKeyId: awsConfig(configService).awsAccessKeyId,
      secretAccessKey: awsConfig(configService).awsSecretAccessKey,
    },
  });

  return {
    storage: multerS3({
      s3,
      bucket: awsConfig(configService).awsBucketName,
      key(_req, file, done) {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        done(null, `${basename}_${Date.now()}${ext}`);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  };
};
