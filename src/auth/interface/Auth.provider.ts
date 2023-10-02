import { AuthService } from '@auth/app/Auth.service';
import { GoogleStrategy } from '@auth/infrastructure/passport/strategies/Google.strategy';
import { KakaoStrategy } from '@auth/infrastructure/passport/strategies/Kakao.strategy';
import { LocalStrategy } from '@auth/infrastructure/passport/strategies/Local.strategy';
import { TokenService } from '@auth/infrastructure/Token.service';
import { ProviderConstant } from '@shared/constants/Provider.constant';
import { HandleDateTime } from '@shared/utils/HandleDateTime';

export const AuthProvider = [
  LocalStrategy,
  GoogleStrategy,
  KakaoStrategy,
  {
    provide: ProviderConstant.ITOKEN_SERVICE,
    useClass: TokenService,
  },
  {
    provide: ProviderConstant.IAUTH_SERVICE,
    useClass: AuthService,
  },
  {
    provide: ProviderConstant.IHANDLE_DATE_TIME,
    useClass: HandleDateTime,
  },
];
