import { UserMessage } from '@shared/messages/user/User.messages';

export const deleteUserDocs = {
  operation: {
    summary: '회원 탈퇴',
    description: `회원 탈퇴\n
  회원 탈퇴를 진행하고, 쿠키에서 accessToken 및 refreshToken을 삭제합니다.
  `,
  },
  noContentResponse: {
    description: UserMessage.DELETE_USER_SUCCESS_MESSAGE,
  },
};