import { LOGOUT_SUCCESS_MESSAGE } from '@shared/messages/auth/auth.messages';
import { ResLogoutDto } from '../dto/logout.dto';

export const logoutDocs = {
  operation: {
    summary: '로그아웃',
    description: `로그아웃\n
    액세스 토큰을 헤더로 요청받은 후,\n
    쿠키에 정의된 리프레시 토큰을 삭제하고, 성공 메시지를 반환합니다.
    `,
  },
  okResponse: { type: ResLogoutDto, description: LOGOUT_SUCCESS_MESSAGE },
};
