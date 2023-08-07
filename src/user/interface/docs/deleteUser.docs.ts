import { DELETE_USER_SUCCESS_MESSAGE } from '@shared/messages/user/user.messages';
import { ResDeleteUserDto } from '../dto/deleteUser.dto';

export const deleteUserDocs = {
  operation: {
    summary: '회원 탈퇴',
    description: `회원 탈퇴\n
  회원 탈퇴를 진행하고, 성공 메시지가 반환됩니다.
  `,
  },
  okResponse: {
    type: ResDeleteUserDto,
    description: DELETE_USER_SUCCESS_MESSAGE,
  },
};
