import { TopOfUserOnDate } from '../entities/user.entity';

export class ReqGetTopUsersOnDateAppDto {
  readonly startDate: string;
  readonly endDate: string;
}

export class ResGetTopUsersOnDateAppDto extends TopOfUserOnDate {}
