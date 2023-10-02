export class AuthErrorMessage {
  static AUTH_INVALID_TOKEN = '유효하지 않은 토큰입니다';
  static AUTH_EMPTY_TOKEN = '토큰이 존재하지 않습니다';
  static AUTH_EXPIRED_TOKEN = '만료된 토큰입니다';
  static AUTH_EXPIRED_REFRESH_TOKEN = '만료된 리프레시 토큰입니다';
  static AUTH_INVALID_ADMIN = '관리자 권한이 없습니다';
  static AUTH_INVALID_PASSWORD = '현재 비밀번호가 일치하지 않습니다';
  static OTHER_IP = '기존 로그인 정보와 다른 IP입니다';
  static OTHER_DEVICE = '기존 로그인 정보와 다른 디바이스 정보입니다';

  static JWT_INVALID_TOKEN = 'invalid token';
  static JWT_MALFORMED = 'jwt malformed';
  static JWT_EXPIRED = 'jwt expired';
  static JWT_NOT_PROVIDED = 'jwt must be provided';
}
