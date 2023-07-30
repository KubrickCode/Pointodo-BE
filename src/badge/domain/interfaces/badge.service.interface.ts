import { ReqBuyBadgeAppDto, ResBuyBadgeAppDto } from '../dto/buyBadge.app.dto';

export interface IBadgeService {
  buyBadge(req: ReqBuyBadgeAppDto): Promise<ResBuyBadgeAppDto>;
}
