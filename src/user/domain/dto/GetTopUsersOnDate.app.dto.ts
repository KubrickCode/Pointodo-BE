import { TopOfUserOnDate } from '../entities/User.entity';

export class ReqGetTopUsersOnDateAppDto {
  readonly startDate: string;
  readonly endDate: string;
}

export class ResGetTopUsersOnDateAppDto extends TopOfUserOnDate {}
