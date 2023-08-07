import { REFRESH_SUCCESS_MESSAGE } from '@shared/messages/auth/auth.messages';
import { ResRefreshDto } from '../dto/refresh.dto';

export const refreshDocs = {
  operation: {
    summary: '리프레시 토큰 재검증',
    description: `리프레시 토큰 재검증\n
  액세스 토큰에 문제가 있을 경우 리프레시 토큰을 검증합니다.\n
  리프레시 토큰이 정상적으로 검증되었을 경우, 새로운 액세스 토큰을 발급하고,\n
  리프레시 토큰의 검증이 실패했을 경우, 쿠키에 정의된 리프레시 토큰을 삭제합니다.
  `,
  },
  okResponse: { type: ResRefreshDto, description: REFRESH_SUCCESS_MESSAGE },
};
