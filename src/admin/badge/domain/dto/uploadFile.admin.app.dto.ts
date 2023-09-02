export class ReqAdminUploadFileAppDto {
  readonly file: Express.MulterS3.File;
}

export class ResAdminUploadFileAppDto {
  readonly filePath: string;
}
