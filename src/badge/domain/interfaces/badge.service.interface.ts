import { ReqBuyBadgeAppDto, ResBuyBadgeAppDto } from '../dto/buyBadge.app.dto';
import {
  ReqChangeSelectedBadgeAppDto,
  ResChangeSelectedBadgeAppDto,
} from '../dto/changeSelectedBadge.app.dto';

export interface IBadgeService {
  buyBadge(req: ReqBuyBadgeAppDto): Promise<ResBuyBadgeAppDto>;
  changeSelectedBadge(
    req: ReqChangeSelectedBadgeAppDto,
  ): Promise<ResChangeSelectedBadgeAppDto>;
}
