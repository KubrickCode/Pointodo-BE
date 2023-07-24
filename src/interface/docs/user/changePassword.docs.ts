import { ResChangePasswordDto } from '@interface/dto/user/changePassword.dto';

export const changePasswordDocs = {
  operation: {
    summary: '비밀번호 변경',
    description: `로컬 유저 비밀번호 변경\n
  새 비밀번호를 전달받아 비밀번호를 변경시키고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: { type: ResChangePasswordDto, description: '비밀번호 변경 성공' },
};
