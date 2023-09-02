import { ResAdminUploadFileDto } from '@admin/interface/dto/badge/uploadFile.admin.dto';

export const uploadFileDocs = {
  operation: {
    summary: '파일 업로드',
    description: `어드민 권한\n
    이미지 파일을 formData로 받아서 S3 서버에 업로드 및 이미지 경로 반환.
  `,
  },
  createdResponse: {
    type: ResAdminUploadFileDto,
    description: '이미지 경로',
  },
};
