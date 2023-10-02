import { Expose } from 'class-transformer';
import {
  ReqGetUserBadgeListAppDto,
  ResGetUserBadgeListAppDto,
} from './GetUserBadgeList.app.dto';

export class ReqGetUserBadgeListWithNameAppDto extends ReqGetUserBadgeListAppDto {}

export class ResGetUserBadgeListWithNameAppDto extends ResGetUserBadgeListAppDto {
  @Expose() readonly name: string;
}
