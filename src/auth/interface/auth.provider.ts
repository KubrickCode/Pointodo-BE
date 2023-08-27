import { AuthService } from '@auth/app/auth.service';
import { GoogleStrategy } from '@auth/infrastructure/passport/strategies/google.strategy';
import { KakaoStrategy } from '@auth/infrastructure/passport/strategies/kakao.strategy';
import { LocalStrategy } from '@auth/infrastructure/passport/strategies/local.strategy';
import { TokenService } from '@auth/infrastructure/token.service';
import {
  IAUTH_SERVICE,
  IHANDLE_DATE_TIME,
  ITOKEN_SERVICE,
} from '@shared/constants/provider.constant';
import { HandleDateTime } from '@shared/utils/handleDateTime';

export const AuthProvider = [
  LocalStrategy,
  GoogleStrategy,
  KakaoStrategy,
  {
    provide: ITOKEN_SERVICE,
    useClass: TokenService,
  },
  {
    provide: IAUTH_SERVICE,
    useClass: AuthService,
  },
  {
    provide: IHANDLE_DATE_TIME,
    useClass: HandleDateTime,
  },
];
